"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/login-screen"
import { HomeScreen } from "@/components/home-screen"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsDashboard } from "@/components/results-dashboard"

type Screen = "login" | "home" | "loading" | "results"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [repoUrl, setRepoUrl] = useState("")

  const handleLogin = () => {
    setCurrentScreen("home")
  }

  const handleLogout = () => {
    setCurrentScreen("login")
    setRepoUrl("")
  }

  const handleAnalyze = (url: string) => {
    setRepoUrl(url)
    setCurrentScreen("loading")
  }

  const handleBackToHome = () => {
    setCurrentScreen("home")
    setRepoUrl("")
  }

  // Simulate loading completion
  useEffect(() => {
    if (currentScreen === "loading") {
      const timer = setTimeout(() => {
        setCurrentScreen("results")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin} />
      )}
      {currentScreen === "home" && (
        <HomeScreen onAnalyze={handleAnalyze} onLogout={handleLogout} />
      )}
      {currentScreen === "loading" && (
        <LoadingScreen repoUrl={repoUrl} />
      )}
      {currentScreen === "results" && (
        <ResultsDashboard repoUrl={repoUrl} onBack={handleBackToHome} />
      )}
    </>
  )
}
