"use client"

import { useState, useEffect } from "react"

export function useLoading(loadingTime = 2000) {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [loadingTime])

  return { isLoading }
}

