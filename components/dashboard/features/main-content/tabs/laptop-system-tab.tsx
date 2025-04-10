"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Clock, Network } from "lucide-react";

interface LaptopSystemTabProps {
  systemData: any;
}

/**
 * LaptopSystemTab displays detailed information about the laptop system
 * Shows CPU cores, memory usage, uptime, load averages, and network interfaces
 */
export default function LaptopSystemTab({ systemData }: LaptopSystemTabProps) {
  if (!systemData) {
    return (
      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6 text-center">
        <div className="text-slate-400">No system data available</div>
      </div>
    );
  }

  // Format uptime to days, hours, minutes, seconds
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${days}d ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${Math.floor(seconds).toString().padStart(2, "0")}`;
  };

  // Format bytes to GB with 2 decimal places
  const formatGB = (bytes: number) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  };

  // Format bytes to MB with 2 decimal places
  const formatMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CPU Information */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Cpu className="mr-2 h-5 w-5 text-cyan-500" />
              CPU Cores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemData.cpu &&
              systemData.cpu.map((core: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-300">
                      Core {index + 1}
                    </div>
                    <div className="text-xs text-cyan-400">
                      {core.usage.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    {core.model}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {(core.speed / 1000).toFixed(2)} GHz
                  </div>
                  <Progress value={core.usage} className="h-1.5 bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${core.usage}%` }}
                    />
                  </Progress>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Memory Information */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <HardDrive className="mr-2 h-5 w-5 text-purple-500" />
              Memory
            </CardTitle>
          </CardHeader>
          <CardContent>
            {systemData.memory && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Total</div>
                    <div className="text-sm font-mono text-slate-200">
                      {formatGB(systemData.memory.total)} GB
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatMB(systemData.memory.total)} MB
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Used</div>
                    <div className="text-sm font-mono text-slate-200">
                      {formatGB(systemData.memory.used)} GB
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatMB(systemData.memory.used)} MB
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Free</div>
                    <div className="text-sm font-mono text-slate-200">
                      {formatGB(systemData.memory.free)} GB
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatMB(systemData.memory.free)} MB
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-1">Usage</div>
                    <div className="text-sm font-mono text-slate-200">
                      {systemData.memory.usage.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-slate-300">Memory Usage</div>
                    <div className="text-xs text-purple-400">
                      {systemData.memory.usage.toFixed(2)}%
                    </div>
                  </div>
                  <Progress
                    value={systemData.memory.usage}
                    className="h-2 bg-slate-700"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${systemData.memory.usage}%` }}
                    />
                  </Progress>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Clock className="mr-2 h-5 w-5 text-green-500" />
              System Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Uptime */}
              <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Uptime</div>
                <div className="text-sm font-mono text-slate-200">
                  {systemData.uptime ? formatUptime(systemData.uptime) : "N/A"}
                </div>
                <div className="text-xs text-slate-500">
                  {systemData.uptime
                    ? `${systemData.uptime.toFixed(2)} seconds`
                    : ""}
                </div>
              </div>

              {/* Load Averages */}
              {systemData.loadavg && (
                <div>
                  <div className="text-sm text-slate-300 mb-2">
                    Load Averages
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50 text-center">
                      <div className="text-xs text-slate-500 mb-1">1 min</div>
                      <div className="text-sm font-mono text-slate-200">
                        {systemData.loadavg[0]}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50 text-center">
                      <div className="text-xs text-slate-500 mb-1">5 min</div>
                      <div className="text-sm font-mono text-slate-200">
                        {systemData.loadavg[1]}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-md p-2 border border-slate-700/50 text-center">
                      <div className="text-xs text-slate-500 mb-1">15 min</div>
                      <div className="text-sm font-mono text-slate-200">
                        {systemData.loadavg[2]}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Network Interfaces */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Network className="mr-2 h-5 w-5 text-blue-500" />
              Network Interfaces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemData.networkInterfaces &&
                Object.entries(systemData.networkInterfaces).map(
                  ([name, interfaces]: [string, any]) => (
                    <div
                      key={name}
                      className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-300">{name}</div>
                        <Badge
                          variant="outline"
                          className={`${
                            interfaces[0]?.internal
                              ? "bg-slate-700/50 text-slate-300 border-slate-600/50"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          } text-xs`}
                        >
                          {interfaces[0]?.internal ? "Internal" : "External"}
                        </Badge>
                      </div>

                      {interfaces.map((iface: any, idx: number) => (
                        <div
                          key={idx}
                          className="mb-2 last:mb-0 bg-slate-800/30 p-2 rounded border border-slate-700/30"
                        >
                          <div className="text-xs font-medium text-slate-300 mb-1">
                            {iface.family} - {iface.address}
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
                            <div>Netmask: {iface.netmask.slice(0,10)}</div>
                            <div>MAC: {iface.mac}</div>
                            <div>CIDR: {iface.cidr}</div>
                            <div>Internal: {iface.internal ? "Yes" : "No"}</div>
                            {iface.scopeid !== undefined && (
                              <div>Scope ID: {iface.scopeid}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
