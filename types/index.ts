import type { LucideIcon } from "lucide-react"

export interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
}

export interface StatusItemProps {
  label: string
  value: number
  color: string
}

export interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}

export interface ProcessRowProps {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
}

export interface StorageItemProps {
  name: string
  total: number
  used: number
  type: string
}

export interface AlertItemProps {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}

export interface CommunicationItemProps {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}

export interface ActionButtonProps {
  icon: LucideIcon
  label: string
}

