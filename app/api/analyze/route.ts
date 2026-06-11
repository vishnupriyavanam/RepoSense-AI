import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
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

        const repoData = await repoRes.json()
        const contents = contentsRes.ok ? await contentsRes.json() : []
        const languages = languagesRes.ok ? await languagesRes.json() : {}

        const fileNames = contents.map((file: any) => file.name.toLowerCase())

        const hasReadme = fileNames.some((name: string) => name.startsWith("readme"))
        const hasLicense = fileNames.some((name: string) => name.includes("license"))
        const hasContributing = fileNames.includes("contributing.md")
        const hasEnvExample = fileNames.includes(".env.example")
        const hasPackageJson = fileNames.includes("package.json")
        const hasRequirements = fileNames.includes("requirements.txt")
        const hasPom = fileNames.includes("pom.xml")
        const hasManagePy = fileNames.includes("manage.py")
        const hasTests = fileNames.some(
            (name: string) => name.includes("test") || name.includes("spec")
        )

        let techStack = Object.keys(languages)

        if (hasPackageJson) techStack.push("React / Node.js / Next.js")
        if (hasRequirements) techStack.push("Python")
        if (hasPom) techStack.push("Spring Boot / Java")
        if (hasManagePy) techStack.push("Django")

        techStack = [...new Set(techStack)]

        const repoName = repoData.name.toLowerCase()
        const description = (repoData.description || "").toLowerCase()
        const language = repoData.language || "Unknown"

        const isAIProject =
            repoName.includes("ai") ||
            description.includes("ai") ||
            description.includes("machine learning") ||
            description.includes("gemini") ||
            description.includes("openai")

        const isPortfolio =
            repoName.includes("portfolio") || description.includes("portfolio")

        const isEcommerce =
            repoName.includes("shop") ||
            repoName.includes("store") ||
            description.includes("ecommerce") ||
            description.includes("e-commerce")

        const isChatApp =
            repoName.includes("chat") || description.includes("chat")
        const isLibraryOrFramework =
            description.includes("library") ||
            description.includes("framework") ||
            repoName.includes("react") ||
            repoName.includes("next") ||
            repoName.includes("vue") ||
            repoName.includes("angular")

        const documentationScore = hasReadme ? 80 : 35
        const folderStructureScore = contents.length > 8 ? 85 : 55
        const maintainabilityScore = repoData.open_issues_count < 20 ? 85 : 65
        const codeQualityScore = hasTests ? 85 : repoData.stargazers_count > 100 ? 88 : 70

        const overallScore = Math.round(
            (documentationScore + folderStructureScore + maintainabilityScore + codeQualityScore) / 4
        )

        const uniquenessScore = Math.min(
            100,
            Math.round(
                (hasReadme ? 20 : 5) +
                (hasLicense ? 10 : 0) +
                (hasContributing ? 10 : 0) +
                (hasEnvExample ? 10 : 0) +
                (hasTests ? 15 : 0) +
                (techStack.length >= 3 ? 20 : techStack.length * 5) +
                (contents.length > 10 ? 15 : 8)
            )
        )

        const projectLevel =
            overallScore >= 80 ? "Advanced" : overallScore >= 60 ? "Intermediate" : "Beginner"

        const resumeReady = overallScore >= 65 && hasReadme

        const missingFiles = [
            { name: "README.md", present: hasReadme },
            { name: "LICENSE", present: hasLicense },
            { name: "CONTRIBUTING.md", present: hasContributing },
            { name: ".env.example", present: hasEnvExample },
            { name: "Tests", present: hasTests },
        ]

        const improvementSuggestions = [
            !hasReadme &&
            "Add a professional README with screenshots, setup steps, features, tech stack, and project architecture",

            !isLibraryOrFramework &&
            !hasEnvExample &&
            "Add a .env.example file so recruiters can understand required environment variables",

            !hasLicense &&
            "Add a LICENSE file to make the project look more open-source ready",

            !hasContributing &&
            "Add CONTRIBUTING.md to show open-source collaboration readiness",

            !hasTests &&
            !isLibraryOrFramework &&
            "Add unit tests for important logic and API routes",

            !isLibraryOrFramework &&
            !repoData.homepage &&
            "Add a live demo link to improve recruiter trust",

            repoData.open_issues_count > 0 &&
            "Resolve open GitHub issues or document known limitations clearly",

            isAIProject &&
            "Add AI response examples, prompt strategy, fallback handling, and model limitation notes",

            isAIProject &&
            "Make improvement suggestions project-specific instead of showing generic tips",

            isPortfolio &&
            "Add case studies, resume download, contact form, and measurable project impact",

            isEcommerce &&
            "Add cart flow, payment integration, order history, product filters, and admin dashboard",

            isChatApp &&
            "Add real-time messaging using WebSockets, typing indicators, and message read status",

            !isLibraryOrFramework &&
            language === "JavaScript" &&
            "Consider migrating important parts to TypeScript for better maintainability",

            isLibraryOrFramework &&
            "Add more beginner-friendly usage examples and contribution guide improvements",

            isLibraryOrFramework &&
            "Improve issue triaging, documentation navigation, and developer onboarding",

            "Add GitHub Actions workflow for linting and build checks",

            !isLibraryOrFramework &&
            "Deploy the project on Vercel, Render, or Railway and add the deployed link in README",
        ].filter(Boolean)
        const roadmap = [
            "Week 1: Improve README, add screenshots, add .env.example, and clean project structure",
            isAIProject
                ? "Week 2: Improve AI prompt logic, add project-type detection, and handle AI fallback properly"
                : isEcommerce
                    ? "Week 2: Add cart, payment flow, product filters, and order management"
                    : isChatApp
                        ? "Week 2: Add WebSocket-based real-time messaging and user presence"
                        : "Week 2: Improve core features, validations, empty states, and error handling",
            "Week 3: Add tests, GitHub Actions, and security improvements",
            "Week 4: Deploy project, add live demo link, and prepare resume-ready bullet points",
        ]

        let aiResponse = "Basic GitHub analysis completed. Gemini AI response was not generated."

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
Tech Stack: ${techStack.join(", ")}
Missing Files: ${missingFiles
                    .filter((file) => !file.present)
                    .map((file) => file.name)
                    .join(", ")}

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
            techStack,
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
            improvementSuggestions,
            roadmap,
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