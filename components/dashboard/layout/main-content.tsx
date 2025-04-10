"use client"

import MainContent from "@/components/dashboard/features/main-content"

/**
 * This is a wrapper component that imports and renders the refactored MainContent
 * It's used to maintain backward compatibility with existing code
 */
export default function MainContentWrapper() {
  return <MainContent />
}

