"use client"

import { useState } from "react"
import { Github, Search, Zap, Shield, BarChart3, Lightbulb, ArrowRight, Sparkles, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HomeScreenProps {
  onAnalyze: (url: string) => void
  onLogout: () => void
}

const features = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Deep learning algorithms analyze your codebase structure, patterns, and quality"
  },
  {
    icon: BarChart3,
    title: "Uniqueness Score",
    description: "Get a score comparing your project against similar repositories worldwide"
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Receive actionable recommendations to enhance your project and resume impact"
  },
  {
    icon: Shield,
    title: "Security Insights",
    description: "Identify potential vulnerabilities and get best practices recommendations"
  }
]

const exampleRepos = [
  { name: "facebook/react", description: "A JavaScript library for building UIs" },
  { name: "vercel/next.js", description: "The React framework for production" },
  { name: "microsoft/vscode", description: "Visual Studio Code editor" }
]

export function HomeScreen({ onAnalyze, onLogout }: HomeScreenProps) {
  const [repoUrl, setRepoUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (repoUrl.trim()) {
      onAnalyze(repoUrl)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-foreground">RepoSense AI</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-secondary/50">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-sm">U</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-foreground">User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass-card">
              <DropdownMenuItem className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="gap-2 text-destructive">
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">AI-Powered Repository Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-foreground">
            Analyze Your{" "}
            <span className="text-primary glow-text">GitHub Repository</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Get comprehensive insights, feature suggestions, and improve your resume impact with AI-powered analysis
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter GitHub repository URL..."
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="h-14 pl-12 pr-4 text-base glass-card border-border/50 focus:border-primary/50 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>
            <Button 
              type="submit"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base glow-purple transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5 mr-2" />
              Analyze Repository
            </Button>
          </div>
        </form>

        {/* Example repos */}
        <div className="mb-20">
          <p className="text-sm text-muted-foreground text-center mb-4">Try with example repositories:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleRepos.map((repo) => (
              <button
                key={repo.name}
                onClick={() => setRepoUrl(`https://github.com/${repo.name}`)}
                className="px-4 py-2 rounded-lg glass-card text-sm hover:bg-secondary/50 transition-colors group"
              >
                <span className="text-foreground">{repo.name}</span>
                <ArrowRight className="inline-block w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 rounded-xl glass-card hover:bg-secondary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Built with AI to help developers showcase their work
        </div>
      </footer>
    </div>
  )
}
