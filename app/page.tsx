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
  const [repoData, setRepoData] = useState<any>(null)

  const handleLogin = () => {
    setCurrentScreen("home")
  }

  const handleLogout = () => {
    setCurrentScreen("login")
    setRepoUrl("")
  }

  const handleAnalyze = async (url: string) => {
    try {
      const parts = url.replace("https://github.com/", "").split("/")

      const owner = parts[0]
      const repo = parts[1]

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: url,
        }),
      })

      if (!response.ok) {
        alert("Analysis failed")
        return
      }

      const data = await response.json()

      setRepoData(data)

      console.log("Repository Found:", data)

      setRepoUrl(url)
      setCurrentScreen("loading")
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    }
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
        <ResultsDashboard
          repoUrl={repoUrl}
          repoData={repoData}
          onBack={handleBackToHome}
        />
      )}
    </>
  )
}
