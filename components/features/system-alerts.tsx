import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AlertItem from "@/components/ui/alert-item"

export default function SystemAlerts() {
  return (
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
  )
}

