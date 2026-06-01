"use client"

import { useEffect, useState } from "react"
import { Sparkles, GitBranch, FileCode, Shield, Lightbulb } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface LoadingScreenProps {
  repoUrl: string
}

const stages = [
  { icon: GitBranch, label: "Cloning repository...", duration: 15 },
  { icon: FileCode, label: "Analyzing code structure...", duration: 25 },
  { icon: Shield, label: "Scanning for patterns...", duration: 25 },
  { icon: Lightbulb, label: "Generating insights...", duration: 20 },
  { icon: Sparkles, label: "Preparing your report...", duration: 15 }
]

export function LoadingScreen({ repoUrl }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let accumulated = 0
    for (let i = 0; i < stages.length; i++) {
      accumulated += stages[i].duration
      if (progress < accumulated) {
        setCurrentStage(i)
        break
      }
    }
  }, [progress])

  const repoName = repoUrl.replace("https://github.com/", "").replace(/\/$/, "")

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Main loading card */}
        <div className="glass-card rounded-2xl p-8 glow-purple">
          {/* Animated icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                {(() => {
                  const StageIcon = stages[currentStage]?.icon || Sparkles
                  return <StageIcon className="w-12 h-12 text-primary animate-pulse" />
                })()}
              </div>
              {/* Scanning animation */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent scan-line" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-accent rounded-full" />
              </div>
            </div>
          </div>

          {/* Repository info */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2 text-foreground">Analyzing Repository</h2>
            <p className="text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1.5 rounded-lg inline-block">
              {repoName}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-3 mb-8">
            <Progress value={progress} className="h-2 bg-secondary" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{stages[currentStage]?.label}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Stage indicators */}
          <div className="flex justify-center gap-2">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentStage 
                    ? 'bg-primary' 
                    : index === currentStage 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tip */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Our AI is analyzing thousands of code patterns
        </p>
      </div>
    </div>
  )
}
