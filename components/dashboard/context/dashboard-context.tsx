"use client"

import { createContext, useContext, type ReactNode } from "react"

export interface DashboardContextType {
  theme: "dark" | "light"
  toggleTheme: () => void
  currentTime: Date
  systemStatus: number
  cpuUsage: number
  memoryUsage: number
  networkStatus: number
  securityLevel: number
  isLoading: boolean
  error?: string | null
  rawData?: any
  lastFetchTime?: Date | null
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({
  children,
  value,
}: {
  children: ReactNode
  value: DashboardContextType
}) {
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

