"use client"

import { useState } from "react"
import { Eye, EyeOff, Sparkles, Brain, Lightbulb, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Visual Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col px-12 py-10">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Small Logo at top */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground/80">RepoSense AI</span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
            <span className="glow-text">RepoSense</span>{" "}
            <span className="text-primary">AI</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-primary/80 font-medium mb-10">
            AI-Powered GitHub Project Reviewer
          </p>

          {/* 3D Coding Illustration */}
          <div className="relative w-72 h-72 mb-10">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl animate-pulse" />
            
            {/* Main illustration container */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              {/* Floating code elements */}
              <div className="absolute inset-0">
                {/* Code brackets floating */}
                <div className="absolute top-8 left-8 text-primary/40 text-2xl font-mono animate-float">{"{ }"}</div>
                <div className="absolute top-12 right-10 text-accent/40 text-xl font-mono animate-float-delayed">{"</>"}</div>
                <div className="absolute bottom-16 left-12 text-primary/30 text-lg font-mono animate-float">{"[ ]"}</div>
                <div className="absolute bottom-10 right-8 text-accent/30 text-xl font-mono animate-float-delayed">{"( )"}</div>
              </div>
              
              {/* Center icon */}
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-white">
                  <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="absolute inset-0 animate-spin-slower">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
              </div>
            </div>
          </div>

          {/* Three feature items in a row */}
          <div className="flex gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center max-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 glow-purple">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">AI-Powered Analysis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Advanced AI analyzes your code</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center max-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 glow-blue">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">Smart Suggestions</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Get intelligent improvements</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center max-w-[140px]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 glow-purple">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">Stand Out</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Impress recruiters</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 lg:px-12 relative bg-card/20">
        {/* Mobile header */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-sm">RepoSense AI</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Login card */}
          <div className="glass-card rounded-2xl p-7 glow-purple">
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-1 text-foreground">
                  Welcome Back <span className="inline-block">{"👋"}</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in to continue
                </p>
              </div>

              {/* Google button first */}
              <Button 
                onClick={onLogin}
                variant="outline"
                className="w-full h-11 bg-secondary/50 border-border/50 hover:bg-secondary/80 font-medium gap-3 transition-all hover:scale-[1.01]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/40" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">OR</span>
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <Button 
                onClick={onLogin}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/25"
              >
                Login
              </Button>

              {/* Sign up link */}
              <p className="text-sm text-center text-muted-foreground">
                {"Don't have an account?"}{" "}
                <button className="text-primary hover:underline font-medium">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
