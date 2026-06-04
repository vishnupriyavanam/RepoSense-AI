import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
    let repoData: any = null
    let projectLevel = "Beginner"
    let techStack: string[] = []
    let overallScore = 55
    let resumeReady = false
    let missingFiles: any[] = []

    try {
        const { repoUrl } = await request.json()

        const cleanUrl = repoUrl.replace("https://github.com/", "").replace(/\/$/, "")
        const [owner, repo] = cleanUrl.split("/")

        if (!owner || !repo) {
            return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 })
        }

        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        const contentsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`)
        const languagesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)

        if (!repoRes.ok) {
            return NextResponse.json({ error: "Repository not found" }, { status: 404 })
        }

        repoData = await repoRes.json()
        const contents = contentsRes.ok ? await contentsRes.json() : []
        const languages = languagesRes.ok ? await languagesRes.json() : {}

        const fileNames = contents.map((file: any) => file.name.toLowerCase())

        const hasReadme = fileNames.some((name: string) => name.startsWith("readme"))
        const hasLicense = fileNames.some((name: string) => name.includes("license"))
        const hasContributing = fileNames.includes("contributing.md")
        const hasPackageJson = fileNames.includes("package.json")
        const hasRequirements = fileNames.includes("requirements.txt")
        const hasPom = fileNames.includes("pom.xml")
        const hasManagePy = fileNames.includes("manage.py")

        techStack = Object.keys(languages)

        if (hasPackageJson) techStack.push("React / Node.js / Next.js")
        if (hasRequirements) techStack.push("Python")
        if (hasPom) techStack.push("Spring Boot / Java")
        if (hasManagePy) techStack.push("Django")

        const documentationScore = hasReadme ? 80 : 35
        const folderStructureScore = contents.length > 8 ? 85 : 55
        const maintainabilityScore = repoData.open_issues_count < 20 ? 85 : 65
        const codeQualityScore = repoData.stargazers_count > 100 ? 88 : 70

        overallScore = Math.round(
            (documentationScore + folderStructureScore + maintainabilityScore + codeQualityScore) / 4
        ) 
        const uniquenessScore = Math.min(
            100,
            Math.round(
                (hasReadme ? 20 : 5) +
                (hasLicense ? 10 : 0) +
                (hasContributing ? 10 : 0) +
                (techStack.length >= 3 ? 20 : techStack.length * 5) +
                (contents.length > 10 ? 20 : 10) +
                (repoData.stargazers_count > 100 ? 20 : 5)
            )
        )

        projectLevel =
            overallScore >= 80 ? "Advanced" : overallScore >= 60 ? "Intermediate" : "Beginner"

        resumeReady = overallScore >= 65 && hasReadme

        missingFiles = [
            { name: "README.md", present: hasReadme },
            { name: "LICENSE", present: hasLicense },
            { name: "CONTRIBUTING.md", present: hasContributing },
            { name: ".env.example", present: fileNames.includes(".env.example") },
            {
                name: "Tests",
                present: fileNames.some(
                    (name: string) => name.includes("test") || name.includes("spec")
                ),
            },
        ]

        let aiResponse =
            "Basic GitHub analysis completed. Gemini AI response was not generated."

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
            })

            const prompt = `
Analyze this GitHub repository.

Repository: ${repoData.full_name}
Description: ${repoData.description}
Stars: ${repoData.stargazers_count}
Forks: ${repoData.forks_count}
Language: ${repoData.language}

Give:
1. Professional AI Summary
2. Recruiter Perspective
3. Resume Readiness Reason
4. Portfolio Worthiness Score out of 10

Keep it concise.
`

            const result = await model.generateContent(prompt)
            aiResponse = result.response.text()
        } catch (geminiError) {
            console.error("Gemini Error:", geminiError)
        }

        return NextResponse.json({
            repo: {
                name: repoData.full_name,
                description: repoData.description || "No description available",
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                issues: repoData.open_issues_count,
                language: repoData.language || "Unknown",
            },
            projectLevel,
            techStack: [...new Set(techStack)],
            scores: {
                codeQuality: codeQualityScore,
                documentation: documentationScore,
                folderStructure: folderStructureScore,
                maintainability: maintainabilityScore,
                overall: overallScore,
            },
            resumeReadiness: {
                status: resumeReady ? "Yes" : "No",
                reason: resumeReady
                    ? "This project can be added to a resume after adding clear screenshots and a live demo."
                    : "This project needs better documentation, structure, and missing essential files before adding it to a resume.",
            },
            recruiterView: aiResponse,
            missingFiles,
            improvementSuggestions: [
                "Add detailed README with screenshots and setup steps",
                "Add live demo link",
                "Add authentication and authorization",
                "Add unit and integration tests",
                "Add CI/CD pipeline using GitHub Actions",
                "Add .env.example file",
                "Deploy the project on Vercel, Render, or Railway",
            ],
            roadmap: [
                "Week 1: Improve README, add screenshots, and clean folder structure",
                "Week 2: Add authentication, validations, and better UI states",
                "Week 3: Add tests, GitHub Actions, and security improvements",
                "Week 4: Deploy project, add live demo link, and prepare resume points",
            ],
            uniquenessScore,
            portfolioScore: `${Math.min(10, Math.max(5, Math.round(overallScore / 10)))}/10`,
        })
    } catch (error: any) {
        console.error("Analyze API Error:", error)

        return NextResponse.json(
            { error: error?.message || "Something went wrong" },
            { status: 500 }
        )
    }
}