"use client"

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

export function ResultsDashboard({ repoUrl, onBack }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const repoName = repoUrl.replace("https://github.com/", "").replace(/\/$/, "") || mockData.overview.fullName

  return (
    <div className="min-h-screen relative">
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
            <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:bg-secondary/50">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:bg-secondary/50">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
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
              <p className="text-muted-foreground">{mockData.overview.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{mockData.overview.stars}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span>{mockData.overview.forks}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{mockData.overview.watchers}</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {mockData.overview.language}
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
              <p className="text-muted-foreground leading-relaxed">{mockData.aiSummary}</p>
            </div>

            {/* Existing Features */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Existing Features</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {mockData.existingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Features */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Suggested Features</h2>
              </div>
              <div className="space-y-3">
                {mockData.suggestedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{feature.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs border-0 ${
                          feature.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                          feature.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-green-500/10 text-green-400'
                        }`}
                      >
                        {feature.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Tips */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Resume Improvement Tips</h2>
              </div>
              <div className="space-y-3">
                {mockData.resumeTips.map((tip, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-secondary/30">
                    <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                ))}
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
                      strokeDasharray={`${mockData.uniquenessScore * 4.02} 402`}
                      className="text-primary"
                    />
                  </svg>
                  {/* Score text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-foreground">{mockData.uniquenessScore}</span>
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
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Components</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">API Routes</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">8.5k</p>
                  <p className="text-xs text-muted-foreground">Lines of Code</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center">
                  <p className="text-2xl font-bold text-foreground">15</p>
                  <p className="text-xs text-muted-foreground">Dependencies</p>
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
