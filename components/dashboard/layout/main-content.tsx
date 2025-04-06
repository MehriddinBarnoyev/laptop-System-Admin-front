"use client"

import { useDashboard } from "@/components/dashboard/context/dashboard-context"
import { Activity, Cpu, HardDrive, RefreshCw, Wifi, AlertCircle, MessageSquare, Shield, Mic } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import MetricCard from "@/components/dashboard/ui/metric-card"
import PerformanceChart from "@/components/dashboard/ui/performance-chart"
import ProcessRow from "@/components/dashboard/ui/process-row"
import StorageItem from "@/components/dashboard/ui/storage-item"
import AlertItem from "@/components/dashboard/ui/alert-item"
import CommunicationItem from "@/components/dashboard/ui/communication-item"

export default function MainContent() {
  const { cpuUsage, memoryUsage, networkStatus, systemStatus, securityLevel, rawData, error, lastFetchTime } =
    useDashboard()

  // Format CPU model and speed if available
  const cpuDetail = rawData?.cpu?.[0]
    ? `${rawData.cpu[0].model.substring(0, 15)}... | ${rawData.cpu[0].speed / 1000} GHz`
    : "3.8 GHz | 12 Cores"

  // Format memory details if available
  const memoryDetail = rawData?.memory
    ? `${Math.round(rawData.memory.used / (1024 * 1024 * 1024))} GB / ${Math.round(rawData.memory.total / (1024 * 1024 * 1024))} GB`
    : "16.4 GB / 24 GB"

  // Network detail would be calculated from network interfaces
  const networkDetail = rawData?.networkInterfaces
    ? `${Object.keys(rawData.networkInterfaces).length} interfaces active`
    : "1.2 GB/s | 42ms"

  console.log("Rendering MainContent with data:", {
    cpuUsage,
    memoryUsage,
    networkStatus,
    cpuDetail,
    memoryDetail,
    networkDetail,
    rawData: !!rawData,
  })

  return (
    <div className="col-span-12 md:col-span-9 lg:col-span-7">
      <div className="grid gap-6">
        {/* System Overview */}
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
            {rawData && (
              <div className="mt-4 p-3 bg-slate-800/50 border border-slate-700/50 rounded-md text-xs font-mono text-slate-300 overflow-auto max-h-40">
                <div className="font-bold mb-1">Raw System Data:</div>
                <pre>{JSON.stringify(rawData, null, 2)}</pre>
              </div>
            )}

            <div className="mt-8">
              <Tabs defaultValue="performance" className="w-full">
                {/* Rest of the component remains the same */}
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-slate-800/50 p-1">
                    <TabsTrigger
                      value="performance"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger
                      value="processes"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Processes
                    </TabsTrigger>
                    <TabsTrigger
                      value="storage"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                    >
                      Storage
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

                {/* Rest of the tabs content remains the same */}
                <TabsContent value="processes" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                      <div className="col-span-1">PID</div>
                      <div className="col-span-4">Process</div>
                      <div className="col-span-2">User</div>
                      <div className="col-span-2">CPU</div>
                      <div className="col-span-2">Memory</div>
                      <div className="col-span-1">Status</div>
                    </div>

                    <div className="divide-y divide-slate-700/30">
                      <ProcessRow
                        pid="1024"
                        name="system_core.exe"
                        user="SYSTEM"
                        cpu={12.4}
                        memory={345}
                        status="running"
                      />
                      <ProcessRow
                        pid="1842"
                        name="nexus_service.exe"
                        user="SYSTEM"
                        cpu={8.7}
                        memory={128}
                        status="running"
                      />
                      <ProcessRow
                        pid="2156"
                        name="security_monitor.exe"
                        user="ADMIN"
                        cpu={5.2}
                        memory={96}
                        status="running"
                      />
                      <ProcessRow
                        pid="3012"
                        name="network_manager.exe"
                        user="SYSTEM"
                        cpu={3.8}
                        memory={84}
                        status="running"
                      />
                      <ProcessRow
                        pid="4268"
                        name="user_interface.exe"
                        user="USER"
                        cpu={15.3}
                        memory={256}
                        status="running"
                      />
                      <ProcessRow
                        pid="5124"
                        name="data_analyzer.exe"
                        user="ADMIN"
                        cpu={22.1}
                        memory={512}
                        status="running"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="storage" className="mt-0">
                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <StorageItem name="System Drive (C:)" total={512} used={324} type="SSD" />
                      <StorageItem name="Data Drive (D:)" total={2048} used={1285} type="HDD" />
                      <StorageItem name="Backup Drive (E:)" total={4096} used={1865} type="HDD" />
                      <StorageItem name="External Drive (F:)" total={1024} used={210} type="SSD" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Rest of the component remains the same */}
        {/* Security & Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security Status */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100 flex items-center text-base">
                <Shield className="mr-2 h-5 w-5 text-green-500" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Firewall</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Intrusion Detection</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Encryption</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Threat Database</div>
                  <div className="text-sm text-cyan-400">
                    Updated <span className="text-slate-500">12 min ago</span>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Security Level</div>
                    <div className="text-sm text-cyan-400">{securityLevel}%</div>
                  </div>
                  <Progress value={securityLevel} className="h-2 bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                      style={{ width: `${securityLevel}%` }}
                    />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-100 flex items-center text-base">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AlertItem
                  title="Security Scan Complete"
                  time="14:32:12"
                  description="No threats detected in system scan"
                  type="info"
                />
                <AlertItem
                  title="Bandwidth Spike Detected"
                  time="13:45:06"
                  description="Unusual network activity on port 443"
                  type="warning"
                />
                <AlertItem
                  title="System Update Available"
                  time="09:12:45"
                  description="Version 12.4.5 ready to install"
                  type="update"
                />
                <AlertItem
                  title="Backup Completed"
                  time="04:30:00"
                  description="Incremental backup to drive E: successful"
                  type="success"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communications */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
              Communications Log
            </CardTitle>
            <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
              4 New Messages
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <CommunicationItem
                sender="System Administrator"
                time="15:42:12"
                message="Scheduled maintenance will occur at 02:00. All systems will be temporarily offline."
                avatar="/placeholder.svg?height=40&width=40"
                unread
              />
              <CommunicationItem
                sender="Security Module"
                time="14:30:45"
                message="Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist."
                avatar="/placeholder.svg?height=40&width=40"
                unread
              />
              <CommunicationItem
                sender="Network Control"
                time="12:15:33"
                message="Bandwidth allocation adjusted for priority services during peak hours."
                avatar="/placeholder.svg?height=40&width=40"
                unread
              />
              <CommunicationItem
                sender="Data Center"
                time="09:05:18"
                message="Backup verification complete. All data integrity checks passed."
                avatar="/placeholder.svg?height=40&width=40"
                unread
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center w-full space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" className="bg-cyan-600 hover:bg-cyan-700">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

