import { CircleOff, Lock, Radio, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function EnvironmentControls() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Environment Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Radio className="text-cyan-500 mr-2 h-4 w-4" />
              <Label className="text-sm text-slate-400">Power Management</Label>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="text-cyan-500 mr-2 h-4 w-4" />
              <Label className="text-sm text-slate-400">Security Protocol</Label>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="text-cyan-500 mr-2 h-4 w-4" />
              <Label className="text-sm text-slate-400">Power Saving Mode</Label>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CircleOff className="text-cyan-500 mr-2 h-4 w-4" />
              <Label className="text-sm text-slate-400">Auto Shutdown</Label>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

