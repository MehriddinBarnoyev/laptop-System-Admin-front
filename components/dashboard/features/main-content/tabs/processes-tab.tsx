"use client"

import ProcessRow from "@/components/dashboard/ui/process-row"

/**
 * ProcessesTab displays a list of running system processes
 * Shows process details like PID, name, user, CPU and memory usage
 */
export default function ProcessesTab() {
  // In a real application, this data would come from an API or context
  const processes = [
    { pid: "1024", name: "system_core.exe", user: "SYSTEM", cpu: 12.4, memory: 345, status: "running" },
    { pid: "1842", name: "nexus_service.exe", user: "SYSTEM", cpu: 8.7, memory: 128, status: "running" },
    { pid: "2156", name: "security_monitor.exe", user: "ADMIN", cpu: 5.2, memory: 96, status: "running" },
    { pid: "3012", name: "network_manager.exe", user: "SYSTEM", cpu: 3.8, memory: 84, status: "running" },
    { pid: "4268", name: "user_interface.exe", user: "USER", cpu: 15.3, memory: 256, status: "running" },
    { pid: "5124", name: "data_analyzer.exe", user: "ADMIN", cpu: 22.1, memory: 512, status: "running" },
  ]

  return (
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
        {processes.map((process) => (
          <ProcessRow
            key={process.pid}
            pid={process.pid}
            name={process.name}
            user={process.user}
            cpu={process.cpu}
            memory={process.memory}
            status={process.status}
          />
        ))}
      </div>
    </div>
  )
}

