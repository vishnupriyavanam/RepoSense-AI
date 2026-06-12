"use client"

import jsPDF from "jspdf"
import { Sparkles, GitBranch, FileCode, Star, GitFork, Eye, CheckCircle2, Lightbulb, ArrowLeft, Download, Layers, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ResultsDashboardProps {
  repoUrl: string
  repoData: any
  onBack: () => void
}

export function ResultsDashboard({ repoUrl, repoData, onBack }: ResultsDashboardProps) {
  const analysis = repoData
  const repo = analysis?.repo

  const repoName =
    repo?.name ||
    repoData?.full_name ||
    repoUrl.replace("https://github.com/", "").replace(/\/$/, "")

  const handleExportPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4")

    pdf.setFontSize(18)
    pdf.text("RepoSense AI - Repository Analysis Report", 15, 20)

    pdf.setFontSize(12)
    pdf.text(`Repository: ${repo?.name || repoName}`, 15, 35)
    pdf.text(`Description: ${repo?.description || "No description available"}`, 15, 45)
    pdf.text(`Language: ${repo?.language || "Unknown"}`, 15, 55)
    pdf.text(`Stars: ${repo?.stars ?? 0}`, 15, 65)
    pdf.text(`Forks: ${repo?.forks ?? 0}`, 15, 75)
    pdf.text(`Open Issues: ${repo?.issues ?? 0}`, 15, 85)

    pdf.text(`Project Level: ${analysis?.projectLevel || "N/A"}`, 15, 100)
    pdf.text(`Portfolio Score: ${analysis?.portfolioScore || "N/A"}`, 15, 110)

    pdf.text("Recruiter View:", 15, 125)
    pdf.text(
      pdf.splitTextToSize(analysis?.recruiterView || "No recruiter view available", 180),
      15,
      135
    )

    pdf.text("Improvement Suggestions:", 15, 170)

    const suggestions = analysis?.improvementSuggestions || []
    suggestions.forEach((item: string, index: number) => {
      pdf.text(`${index + 1}. ${item}`, 20, 180 + index * 8)
    })

    pdf.save("reposense-ai-report.pdf")
  }

  return (
    <div id="analysis-report" className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/50">
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">RepoSense AI</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 hover:bg-secondary/50"
            onClick={handleExportPDF}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <GitBranch className="w-7 h-7 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">{repoName}</h1>
              <p className="text-muted-foreground">
                {repo?.description || "No description available"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{repo?.stars ?? 0}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span>{repo?.forks ?? 0}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{repo?.issues ?? 0}</span>
            </div>

            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {repo?.language || "Unknown"}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">AI Summary</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Repository: {repo?.name || repoName}
                <br />
                Language: {repo?.language || "Unknown"}
                <br />
                Stars: {repo?.stars ?? 0}
                <br />
                Forks: {repo?.forks ?? 0}
                <br />
                Open Issues: {repo?.issues ?? 0}
                <br />
                Description: {repo?.description || "No description available"}
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Project Level</h2>
              <p>{analysis?.projectLevel || "N/A"}</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Resume Readiness</h2>
              <p>
                {analysis?.resumeReadiness?.status === "Yes"
                  ? "✅ Yes - Can be added to resume"
                  : "❌ No - Needs improvement"}
              </p>
              <p className="text-muted-foreground mt-2">
                {analysis?.resumeReadiness?.reason}
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recruiter View</h2>
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {analysis?.recruiterView || "No recruiter view available"}
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio Score</h2>
              <p className="text-3xl font-bold">{analysis?.portfolioScore || "N/A"}</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Improvement Suggestions</h2>
              </div>

              <div className="space-y-3">
                {(analysis?.improvementSuggestions || []).map((item: string, index: number) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/30">
                    🔥 {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 glow-purple">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Uniqueness Score</h2>
              </div>

              <div className="relative flex justify-center mb-6">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-secondary"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${(analysis?.uniquenessScore ?? 0) * 4.02} 402`}
                      className="text-primary"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-foreground">
                        {analysis?.uniquenessScore ?? 0}
                      </span>
                      <span className="text-sm text-muted-foreground block">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Badge className="bg-primary/20 text-primary border-0 mb-2">
                  {analysis?.uniquenessScore >= 75 ? "Strong" : "Needs Improvement"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Score based on documentation, structure, tests, files, and tech stack.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Tech Stack</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {(analysis?.techStack || []).length > 0 ? (
                  analysis.techStack.map((tech: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-500/10 text-purple-400 border-purple-500/20"
                    >
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No tech stack detected</p>
                )}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <FileCode className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Quick Stats</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">{repo?.stars ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">{repo?.forks ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Forks</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">{repo?.issues ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Open Issues</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {(analysis?.techStack || []).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Tech Items</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Security Status</span>
                <span className="font-semibold text-green-500">Basic Check</span>
              </div>

              <Progress value={70} className="h-2 bg-secondary mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Basic repository metadata analyzed
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Missing essential files checked
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}