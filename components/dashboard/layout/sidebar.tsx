"use client"

import { Activity, Command, Database, Globe, MessageSquare, Shield, Terminal, Settings } from "lucide-react"
import NavItem from "@/components/dashboard/ui/nav-item"
import StatusItem from "@/components/dashboard/ui/status-item"
import { useDashboard } from "@/components/dashboard/context/dashboard-context"
import { Sidebar as SidebarComponent, SidebarContent } from "@/components/ui/sidebar"

export default function Sidebar() {
  const { systemStatus, securityLevel, networkStatus } = useDashboard()

  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2">
      <SidebarComponent>
        <SidebarContent className="p-4">
          <nav className="space-y-2">
            <NavItem icon={Command} label="Dashboard" active />
            <NavItem icon={Activity} label="Diagnostics" />
            <NavItem icon={Database} label="Data Center" />
            <NavItem icon={Globe} label="Network" />
            <NavItem icon={Shield} label="Security" />
            <NavItem icon={Terminal} label="Console" />
            <NavItem icon={MessageSquare} label="Communications" />
            <NavItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
            <div className="space-y-3">
              <StatusItem label="Core Systems" value={systemStatus} color="cyan" />
              <StatusItem label="Security" value={securityLevel} color="green" />
              <StatusItem label="Network" value={networkStatus} color="blue" />
            </div>
          </div>
        </SidebarContent>
      </SidebarComponent>
    </div>
  )
}

