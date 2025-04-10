"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LoginUser, RegisterUser } from "@/lib/auth"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for a token in localStorage
        const token = localStorage.getItem("auth_token")

        if (token) {
          // In a real app, you would validate the token with your backend
          // For now, we'll parse the user data from the token if it exists
          try {
            const userData = JSON.parse(localStorage.getItem("user_data") || "")
            if (userData) {
              setUser(userData)
            }
          } catch (error) {
            console.error("Failed to parse user data:", error)
            localStorage.removeItem("auth_token")
            localStorage.removeItem("user_data")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (!isLoading && !user && !pathname?.startsWith("/login") && !pathname?.startsWith("/register")) {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await LoginUser({ email, password });

      const { token, user: userData } = response

      localStorage.setItem("auth_token", token)


      localStorage.setItem("user_data", JSON.stringify(userData))


      setUser(userData)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log("Registering user:", { username, email, password });

      await RegisterUser({ username, email, password })

      // After successful registration, automatically log in the user
      const response = await LoginUser({ email, password })

      // Extract token and user data from response
      const { token, user: userData } = response

      // Store token in localStorage
      localStorage.setItem("auth_token", token)

      // Store user data in localStorage for persistence
      localStorage.setItem("user_data", JSON.stringify(userData))

      // Set user in state
      setUser(userData)

      // Registration successful, no need to return a value
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")

    // Clear user state
    setUser(null)

    // Redirect to login
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

