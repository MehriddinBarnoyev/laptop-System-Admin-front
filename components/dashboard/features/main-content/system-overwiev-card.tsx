"use client"

import { Activity, Cpu, HardDrive, RefreshCw, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import MetricCard from "@/components/dashboard/ui/metric-card"
import SystemMetricsTabs from "./system-metrics-tabs"

interface SystemOverviewCardProps {
  cpuUsage: number
  memoryUsage: number
  networkStatus: number
  cpuDetail: string
  memoryDetail: string
  networkDetail: string
  error: string | null | undefined
  lastFetchTime: Date | null | undefined
  rawData: any
}

/**
 * SystemOverviewCard displays the main system metrics and performance data
 * It shows CPU, memory, and network usage along with detailed performance tabs
 */
export default function SystemOverviewCard({
  cpuUsage,
  memoryUsage,
  networkStatus,
  cpuDetail,
  memoryDetail,
  networkDetail,
  error,
  lastFetchTime,
  rawData,
}: SystemOverviewCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center">
            <Activity className="mr-2 h-5 w-5 text-cyan-500" />
            System Overview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
              LIVE
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">
            Error: {error}
          </div>
        )}

        {lastFetchTime && (
          <div className="mb-4 p-2 bg-green-500/10 border border-green-500/30 rounded-md text-green-400 text-xs">
            Last updated: {lastFetchTime.toLocaleTimeString()}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="CPU Usage"
            value={Math.round(cpuUsage)}
            icon={Cpu}
            trend="up"
            color="cyan"
            detail={cpuDetail}
          />
          <MetricCard
            title="Memory"
            value={Math.round(memoryUsage)}
            icon={HardDrive}
            trend="stable"
            color="purple"
            detail={memoryDetail}
          />
          <MetricCard
            title="Network"
            value={Math.round(networkStatus)}
            icon={Wifi}
            trend="down"
            color="blue"
            detail={networkDetail}
          />
        </div>

        {/* Debug information */}
       

        <div className="mt-8">
          <SystemMetricsTabs cpuUsage={cpuUsage} rawData={rawData} />
        </div>
      </CardContent>
    </Card>
  )
}

