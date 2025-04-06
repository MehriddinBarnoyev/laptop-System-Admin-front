"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Optionally save to localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-theme", newTheme)
    }
  }

  // Initialize theme from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("dashboard-theme") as "dark" | "light" | null
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        // Use system preference as fallback
        setTheme("light")
      }
    }
  }, [])

  return { theme, toggleTheme }
}

