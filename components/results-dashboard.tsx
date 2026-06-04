"use client"

import jsPDF from "jspdf"

import { useState } from "react"
import { 
  Sparkles, 
  GitBranch, 
  FileCode, 
  Star, 
  GitFork, 
  Eye,
  CheckCircle2,
  Lightbulb,
  Code2,
  Briefcase,
  ArrowLeft,
  Download,
  Share2,
  TrendingUp,
  Layers,
  Shield,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ResultsDashboardProps {
  repoUrl: string
  repoData: any
  onBack: () => void
}

const mockData = {
  overview: {
    name: "my-awesome-project",
    fullName: "user/my-awesome-project",
    description: "A modern web application built with React and TypeScript",
    stars: 127,
    forks: 34,
    watchers: 18,
    language: "TypeScript",
    lastUpdated: "2 days ago"
  },
  aiSummary: "This repository demonstrates strong frontend development skills with a focus on modern React patterns and TypeScript. The codebase shows good understanding of component architecture, state management, and API integration. The project would benefit from improved test coverage and documentation.",
  existingFeatures: [
    "React 18 with TypeScript",
    "Tailwind CSS styling",
    "REST API integration",
    "Responsive design",
    "Dark/Light theme support",
    "Form validation with Zod"
  ],
  suggestedFeatures: [
    { title: "Add unit tests", priority: "High", impact: "Significant" },
    { title: "Implement CI/CD pipeline", priority: "High", impact: "Moderate" },
    { title: "Add API documentation", priority: "Medium", impact: "Moderate" },
    { title: "Implement error boundary", priority: "Medium", impact: "Low" },
    { title: "Add PWA support", priority: "Low", impact: "Moderate" }
  ],
  techStack: [
    { name: "React", percentage: 40, color: "bg-chart-1" },
    { name: "TypeScript", percentage: 35, color: "bg-chart-2" },
    { name: "Tailwind", percentage: 15, color: "bg-chart-3" },
    { name: "Other", percentage: 10, color: "bg-chart-4" }
  ],
  uniquenessScore: 72,
  resumeTips: [
    "Highlight the TypeScript implementation to show type-safety expertise",
    "Emphasize the responsive design and accessibility features",
    "Mention the modern React patterns used (hooks, context)",
    "Add metrics: number of components, API endpoints, etc.",
    "Include a live demo link to showcase the project"
  ]
}

export function ResultsDashboard({
  repoUrl,
  repoData,
  onBack,
}: ResultsDashboardProps) {

  const [activeTab, setActiveTab] = useState("overview")
  const analysis = repoData
  const repo = analysis?.repo

  const repoName =
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
    pdf.text(pdf.splitTextToSize(analysis?.recruiterView || "No recruiter view available", 180), 15, 135)

    pdf.text("Improvement Suggestions:", 15, 170)

    const suggestions = analysis?.improvementSuggestions || []
    suggestions.forEach((item: string, index: number) => {
      pdf.text(`${index + 1}. ${item}`, 20, 180 + index * 8)
    })

    pdf.save("reposense-ai-report.pdf")
  }

  return (
    <div id="analysis-report" className="min-h-screen ...">
    
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
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
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/50 hover:bg-secondary/50"
              onClick={handleExportPDF}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF </span>
            </Button>

            
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Repository header */}
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
              <span>{repo?.stars}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span>{repo?.forks}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{repo?.issues}</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
  {repo?.language}
</Badge>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">AI Summary</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Repository: {repo?.name}
                <br />
                Language: {repo?.language}
                <br />
                Stars: {repo?.stars}
                <br />
                Forks: {repo?.forks}
                <br />
                Open Issues: {repo?.issues}
                <br />
                Description: {repo?.description || "No description available"}
              </p>
            </div>
            {/* Project Level */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Project Level</h2>
              <p>
                {analysis?.projectLevel}
              </p>
            </div>

            {/* Resume Readiness */}
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

            {/* Recruiter View */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recruiter View</h2>
              <p>
                
                  {analysis?.recruiterView}
                
              </p>
            </div>

            {/* Portfolio Score */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio Score</h2>
              <p className="text-3xl font-bold">
                {analysis?.portfolioScore}
              </p>
            </div>

           
            {/* Improvement Suggestions */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Improvement Suggestions
                </h2>
              </div>

              <div className="space-y-3">
                {analysis?.improvementSuggestions?.map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-secondary/30"
                    >
                      🔥 {item}
                    </div>
                  )
                )}
              </div>
            </div>
             
          </div>
          {/* Right column */}
          
          <div className="space-y-6">
            {/* Uniqueness Score */}
            <div className="glass-card rounded-xl p-6 glow-purple">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Uniqueness Score</h2>
              </div>
              
              <div className="relative flex justify-center mb-6">
                <div className="relative w-36 h-36">
                  {/* Background circle */}
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
                      strokeDasharray={`${(repoData?.uniquenessScore ?? 72) * 4.02} 402`}
                      className="text-primary"
                    />
                  </svg>
                  {/* Score text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-foreground">
                        {repoData?.uniquenessScore ?? 72}
                      </span>
                      <span className="text-sm text-muted-foreground block">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Badge className="bg-primary/20 text-primary border-0 mb-2">Above Average</Badge>
                <p className="text-sm text-muted-foreground">Your project stands out from similar repositories</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Tech Stack</h2>
              </div>
              
              <div className="space-y-4">
                {mockData.techStack.map((tech, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground">{tech.name}</span>
                      <span className="text-muted-foreground">{tech.percentage}%</span>
                    </div>
                    <Progress value={tech.percentage} className="h-2 bg-secondary" />
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Stats */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <FileCode className="w-5 h-5 text-cyan-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Quick Stats</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {repoData?.repo?.stars ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {repoData?.repo?.forks ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Forks</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {repoData?.repo?.issues ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Open Issues</p>
                </div>

                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {repoData?.repo?.watchers ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Watchers</p>
                </div>
              </div>
            </div>
            {/* Security Score */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Security Score</span>
                <span className="font-semibold text-green-500">Good</span>
              </div>
              <Progress value={85} className="h-2 bg-secondary mb-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  No known vulnerabilities
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  Dependencies up to date
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
