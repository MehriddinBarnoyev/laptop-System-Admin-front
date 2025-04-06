import type { ReactNode } from "react"
import Header from "../dashboard/layout/header"

interface DashboardLayoutProps {
  children: ReactNode
  theme: "dark" | "light"
  toggleTheme: () => void
  currentTime: Date
}

export default function DashboardLayout({ children, theme, toggleTheme, currentTime }: DashboardLayoutProps) {
  return (
    <div className="container mx-auto p-4 relative z-10">
      <Header  />

      <div className="grid grid-cols-12 gap-6">{children}</div>
    </div>
  )
}

