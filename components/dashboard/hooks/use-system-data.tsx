"use client"

import { useState, useEffect } from "react"
import { getSystemStats } from "@/lib/api"

export function useSystemData() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null)

  // Fallback values for when API data is not available
  const fallbackSystemStatus = 85
  const fallbackSecurityLevel = 75

  // Fetch system stats from API
  useEffect(() => {
    const fetchSystemStats = async () => {
      try {
        setLoading(true)
        const stats = await getSystemStats()

        console.log("Stats in useSystemData:", stats)

        if (stats) {
          setData(stats)
          setLastFetchTime(new Date())
          setError(null)
        } else {
          setError("Failed to fetch system stats")
        }
      } catch (err) {
        console.error("Error in useSystemData:", err)
        setError("An error occurred while fetching system stats")
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchSystemStats()

    // Set up polling every 5 seconds
    const interval = setInterval(fetchSystemStats, 5000)

    return () => clearInterval(interval)
  }, [])

  // Calculate average CPU usage from all cores
  const cpuUsage = data?.cpu
    ? data.cpu.reduce((sum: number, core: any) => sum + core.usage, 0) / data.cpu.length
    : Math.floor(Math.random() * 30) + 30

  // Get memory usage percentage
  const memoryUsage = data?.memory?.usage ?? Math.floor(Math.random() * 20) + 60

  // Network status - calculate from network interfaces or use fallback
  const networkStatus = data?.networkInterfaces
    ? 90 // In a real app, you would calculate this from networkInterfaces data
    : Math.floor(Math.random() * 15) + 80

  // System status - could be derived from multiple metrics
  const systemStatus = data
    ? (cpuUsage + memoryUsage) / 2 // Simple average as an example
    : fallbackSystemStatus

  // Security level - this would typically come from a security monitoring service
  const securityLevel = fallbackSecurityLevel

  console.log("Processed system data:", {
    cpuUsage,
    memoryUsage,
    networkStatus,
    systemStatus,
    lastFetchTime: lastFetchTime?.toISOString(),
  })

  return {
    systemStatus,
    cpuUsage,
    memoryUsage,
    networkStatus,
    securityLevel,
    isLoading: loading,
    error,
    rawData: data,
    lastFetchTime,
  }
}

