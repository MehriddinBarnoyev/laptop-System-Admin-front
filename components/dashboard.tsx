"use client"

import { useEffect, useState } from "react"
import MainContent from "@/components/layout/main-content"
import Sidebar from "@/components/layout/sidebar"
import RightSidebar from "@/components/layout/right-sidebar"
import ParticleBackground from "@/components/ui/particle-background"
import LoadingOverlay from "@/components/ui/loading-overlay"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      <ParticleBackground />

      {isLoading && <LoadingOverlay />}

      <div className="container mx-auto p-4 relative z-10">
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          {/* Header content from Header component */}
          {/* ... */}
        </header>

        <div className="grid grid-cols-12 gap-6">
          <Sidebar systemStatus={systemStatus} securityLevel={securityLevel} networkStatus={networkStatus} />

          <MainContent
            cpuUsage={cpuUsage}
            memoryUsage={memoryUsage}
            networkStatus={networkStatus}
            systemStatus={systemStatus}
            securityLevel={securityLevel}
          />

          <RightSidebar
            currentTime={currentTime}
            cpuUsage={cpuUsage}
            memoryUsage={memoryUsage}
            networkStatus={networkStatus}
          />
        </div>
      </div>
    </div>
  )
}

