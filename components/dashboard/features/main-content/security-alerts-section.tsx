"use client"

import { AlertCircle, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import AlertItem from "@/components/dashboard/ui/alert-item"

interface SecurityAlertsSectionProps {
  securityLevel: number
}

/**
 * SecurityAlertsSection displays security status and system alerts
 * Shows security metrics and recent system notifications
 */
export default function SecurityAlertsSection({ securityLevel }: SecurityAlertsSectionProps) {
  // In a real application, this data would come from an API or context
  const securityItems = [
    { name: "Firewall", status: "Active" },
    { name: "Intrusion Detection", status: "Active" },
    { name: "Encryption", status: "Active" },
  ]

  const alerts = [
    {
      title: "Security Scan Complete",
      time: "14:32:12",
      description: "No threats detected in system scan",
      type: "info" as const,
    },
    {
      title: "Bandwidth Spike Detected",
      time: "13:45:06",
      description: "Unusual network activity on port 443",
      type: "warning" as const,
    },
    {
      title: "System Update Available",
      time: "09:12:45",
      description: "Version 12.4.5 ready to install",
      type: "update" as const,
    },
    {
      title: "Backup Completed",
      time: "04:30:00",
      description: "Incremental backup to drive E: successful",
      type: "success" as const,
    },
  ]

  return (
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
            {securityItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="text-sm text-slate-400">{item.name}</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{item.status}</Badge>
              </div>
            ))}

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
            {alerts.map((alert) => (
              <AlertItem
                key={alert.title}
                title={alert.title}
                time={alert.time}
                description={alert.description}
                type={alert.type}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

