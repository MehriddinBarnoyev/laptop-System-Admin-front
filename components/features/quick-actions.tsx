import { Download, RefreshCw, Shield, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ActionButton from "@/components/ui/action-button"

export default function QuickActions() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton icon={Shield} label="Security Scan" />
          <ActionButton icon={RefreshCw} label="Sync Data" />
          <ActionButton icon={Download} label="Backup" />
          <ActionButton icon={Terminal} label="Console" />
        </div>
      </CardContent>
    </Card>
  )
}

