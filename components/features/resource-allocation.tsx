import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface ResourceAllocationProps {
  cpuUsage: number
  memoryUsage: number
  networkStatus: number
}

export default function ResourceAllocation({ cpuUsage, memoryUsage, networkStatus }: ResourceAllocationProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">Resource Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Processing Power</div>
              <div className="text-xs text-cyan-400">{cpuUsage}% allocated</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${cpuUsage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Memory Allocation</div>
              <div className="text-xs text-purple-400">{memoryUsage}% allocated</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${memoryUsage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Network Bandwidth</div>
              <div className="text-xs text-blue-400">35% allocated</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-400">Priority Level</div>
              <div className="flex items-center">
                <Slider defaultValue={[3]} max={5} step={1} className="w-24 mr-2" />
                <span className="text-cyan-400">3/5</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

