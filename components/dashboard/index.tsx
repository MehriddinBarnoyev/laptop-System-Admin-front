"use client"

import { DashboardProvider } from "@/components/dashboard/context/dashboard-context"
import { useSystemData } from "@/components/dashboard/hooks/use-system-data"
import { useSystemTime } from "@/components/dashboard/hooks/use-system-time"
import { useTheme } from "@/components/dashboard/hooks/use-theme"
import { useLoading } from "@/components/dashboard/hooks/use-loading"
import Header from "@/components/dashboard/layout/header"
import Sidebar from "@/components/dashboard/layout/sidebar"
import MainContent from "@/components/dashboard/layout/main-content"
import RightSidebar from "@/components/dashboard/layout/right-sidebar"
import ParticleBackground from "@/components/dashboard/ui/particle-background"
import LoadingOverlay from "@/components/dashboard/ui/loading-overlay"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
  // Custom hooks for different aspects of dashboard functionality
  const { theme, toggleTheme } = useTheme()
  const { currentTime } = useSystemTime()
  const {
    systemStatus,
    cpuUsage,
    memoryUsage,
    networkStatus,
    securityLevel,
    isLoading: apiLoading,
    error,
    rawData,
    lastFetchTime,
  } = useSystemData()

  // We'll use the loading state from the API instead of a simulated one
  const { isLoading: initialLoading } = useLoading(2000)
  const isLoading = initialLoading || apiLoading

  console.log("Dashboard component rendering with data:", {
    cpuUsage,
    memoryUsage,
    networkStatus,
    hasRawData: !!rawData,
    lastFetchTime: lastFetchTime?.toISOString(),
  })

  return (
    <SidebarProvider>
      <DashboardProvider
        value={{
          theme,
          toggleTheme,
          currentTime,
          systemStatus,
          cpuUsage,
          memoryUsage,
          networkStatus,
          securityLevel,
          isLoading,
          error,
          rawData,
          lastFetchTime,
        }}
      >
        <div
          className={`${theme} w-full min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
        >
          <ParticleBackground />

          {isLoading && <LoadingOverlay />}

          <div className="container mx-auto p-4 relative z-10">
            <Header />

            <div className="grid grid-cols-12 gap-6">
              <Sidebar />
              <MainContent />
              <RightSidebar />
            </div>
          </div>
        </div>
      </DashboardProvider>
    </SidebarProvider>
  )
}

