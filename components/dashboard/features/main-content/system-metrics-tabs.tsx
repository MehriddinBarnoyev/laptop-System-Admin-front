"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PerformanceChart from "@/components/dashboard/ui/performance-chart"
import ProcessesTab from "./tabs/processes-tab"
import StorageTab from "./tabs/storage-tab"
import LaptopSystemTab from "./tabs/laptop-system-tab"
import NetworkInterfacesTab from "./tabs/network-interfaces-tab"

interface SystemMetricsTabsProps {
  cpuUsage: number
  rawData: any
}

/**
 * SystemMetricsTabs provides a tabbed interface for different system metrics views
 * Includes performance charts, process lists, storage information, and laptop system details
 */
export default function SystemMetricsTabs({ cpuUsage, rawData }: SystemMetricsTabsProps) {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="bg-slate-800/50 p-1">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger value="processes" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Processes
          </TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Storage
          </TabsTrigger>
          <TabsTrigger
            value="laptop-system"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Laptop System
          </TabsTrigger>
          <TabsTrigger
            value="network-interfaces"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Network
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
            CPU
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
            Memory
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
            Network
          </div>
        </div>
      </div>

      <TabsContent value="performance" className="mt-0">
        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
          <PerformanceChart />
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
            <div className="text-xs text-slate-400">System Load</div>
            <div className="text-lg font-mono text-cyan-400">{Math.round(cpuUsage)}%</div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="processes" className="mt-0">
        <ProcessesTab />
      </TabsContent>

      <TabsContent value="storage" className="mt-0">
        <StorageTab />
      </TabsContent>

      <TabsContent value="laptop-system" className="mt-0">
        <LaptopSystemTab systemData={rawData} />
      </TabsContent>

      <TabsContent value="network-interfaces" className="mt-0">
        <NetworkInterfacesTab networkData={rawData?.networkInterfaces} />
      </TabsContent>
    </Tabs>
  )
}

