"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Hexagon, Lock, Mail, User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import LoginBackground from "@/components/auth/login-background"
import { RegisterUser, LoginUser } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))

    // Clear error for terms
    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.agreeTerms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update the handleSubmit function to redirect to dashboard after successful registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { username, email, password } = formData

      // Register the user
      const registerResponse = await RegisterUser({ username, email, password })
      console.log("Registration response:", registerResponse)

      // After successful registration, automatically log in the user
      const loginResponse = await LoginUser({ email, password })
      console.log("Login response:", loginResponse)

      // Store token in localStorage
      localStorage.setItem("auth_token", loginResponse.token)

      // Store user data in localStorage for persistence
      localStorage.setItem("user_data", JSON.stringify(loginResponse.user))

      // Redirect to dashboard
      router.push("/")
    } catch (error: any) {
      console.error("Registration error:", error)

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.errors) {
          // Handle validation errors from the server
          const serverErrors: Record<string, string> = {}
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            serverErrors[key] = Array.isArray(value) ? value[0] : (value as string)
          }
          setErrors(serverErrors)
        } else {
          setErrors({ form: error.response.data.message || "Registration failed" })
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrors({ form: "No response from server. Please try again later." })
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrors({ form: "An error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden flex items-center justify-center p-4">
      <LoginBackground />

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-10 w-10 text-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NEXUS OS
            </span>
          </div>
        </div>

        <Card className="bg-slate-900/70 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errors.form && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">
                  {errors.form}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={formData.username}
                    onChange={handleChange}
                    className={`bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500 ${
                      errors.username ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-slate-800/50 border-slate-700 pl-10 pr-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500 ${
                      errors.password ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500 ${
                      errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                  className={`mt-1 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 ${
                    errors.agreeTerms ? "border-red-500" : ""
                  }`}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                      privacy policy
                    </Link>
                  </label>
                  {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create account
                  </div>
                )}
              </Button>
              <div className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
