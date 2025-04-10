"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Eye, EyeOff, Save, Camera, Hexagon, Shield, Clock, Calendar, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { updateUserProfile, changePassword } from "@/lib/profile"

export default function ProfilePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [userData, setUserData] = useState<any>(null)

    const [profileForm, setProfileForm] = useState({
        username: "",
        email: "",
        bio: "",
        avatar: "",
    })

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUserData = localStorage.getItem("user_data")
        if (storedUserData) {
            try {
                const parsedUserData = JSON.parse(storedUserData)
                setUserData(parsedUserData)
                setProfileForm({
                    username: parsedUserData.username || "",
                    email: parsedUserData.email || "",
                    bio: parsedUserData.bio || "",
                    avatar: parsedUserData.avatar || "",
                })
            } catch (err) {
                console.error("Error parsing user data:", err)
                router.push("/login")
            }
        } else {
            router.push("/login")
        }
    }, [router])

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileForm((prev) => ({ ...prev, [name]: value }))
        setError(null)
        setSuccess(null)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordForm((prev) => ({ ...prev, [name]: value }))
        setError(null)
        setSuccess(null)
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await updateUserProfile({
                username: profileForm.username,
                email: profileForm.email,
                bio: profileForm.bio,
                avatar: profileForm.avatar,
            })

            // Update local storage with new user data
            const updatedUserData = { ...userData, ...response.user }
            localStorage.setItem("user_data", JSON.stringify(updatedUserData))
            setUserData(updatedUserData)

            setSuccess("Profile updated successfully")
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || "Failed to update profile")
            } else if (err.request) {
                setError("No response from server. Please try again later.")
            } else {
                setError("An error occurred. Please try again.")
            }
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate passwords
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError("New passwords do not match")
            return
        }

        if (passwordForm.newPassword.length < 8) {
            setError("New password must be at least 8 characters long")
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await changePassword(passwordForm.currentPassword, passwordForm.newPassword)

            // Reset password form
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })

            setSuccess("Password changed successfully")
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || "Failed to change password")
            } else if (err.request) {
                setError("No response from server. Please try again later.")
            } else {
                setError("An error occurred. Please try again.")
            }
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        router.push("/login")
    }

    // Calculate account age (for demo purposes)
    const accountCreated = new Date(userData?.createdAt || new Date())
    accountCreated.setMonth(accountCreated.getMonth() - 6) // Mock 6 months ago if no data
    const accountAge = Math.floor((new Date().getTime() - accountCreated.getTime()) / (1000 * 60 * 60 * 24))

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 p-4">
            <div className="container mx-auto max-w-6xl">
                <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
                    <div className="flex items-center space-x-2">
                        <Hexagon className="h-8 w-8 text-cyan-500" />
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            NEXUS OS
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/")}
                            className="text-slate-400 hover:text-slate-100"
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleLogout}
                            className="bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Summary Card */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm lg:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 flex items-center text-xl">
                                <User className="mr-2 h-5 w-5 text-cyan-500" />
                                Profile Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <Avatar className="h-24 w-24 border-2 border-cyan-500/50">
                                    <AvatarImage
                                        src={profileForm.avatar || "/placeholder.svg?height=96&width=96"}
                                        alt={profileForm.username}
                                    />
                                    <AvatarFallback className="bg-slate-800 text-cyan-500 text-2xl">
                                        {profileForm.username?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-slate-800 rounded-full p-1 border border-slate-700">
                                    <Camera className="h-5 w-5 text-cyan-400" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-slate-100 mb-1">{profileForm.username}</h2>
                            <p className="text-sm text-slate-400 mb-4">{profileForm.email}</p>

                            <div className="w-full space-y-4 mt-2">
                                <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50 flex items-center">
                                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                                    <div className="flex-1">
                                        <div className="text-sm text-slate-300">Security Status</div>
                                        <div className="text-xs text-slate-400">Account Protected</div>
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                                </div>

                                <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50 flex items-center">
                                    <Clock className="h-5 w-5 text-blue-500 mr-3" />
                                    <div className="flex-1">
                                        <div className="text-sm text-slate-300">Account Age</div>
                                        <div className="text-xs text-slate-400">{accountAge} days</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50 flex items-center">
                                    <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                                    <div className="flex-1">
                                        <div className="text-sm text-slate-300">Member Since</div>
                                        <div className="text-xs text-slate-400">{accountCreated.toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Edit Tabs */}
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 text-xl">Account Settings</CardTitle>
                            <CardDescription className="text-slate-400">
                                Manage your profile information and security settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="bg-slate-800/50 p-1 mb-6">
                                    <TabsTrigger
                                        value="profile"
                                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                    >
                                        Profile
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="security"
                                        className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                                    >
                                        Security
                                    </TabsTrigger>
                                </TabsList>

                                {/* Profile Tab */}
                                <TabsContent value="profile" className="mt-0">
                                    {error && (
                                        <Alert className="mb-4 bg-red-500/10 border-red-500/30 text-red-400">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {success && (
                                        <Alert className="mb-4 bg-green-500/10 border-green-500/30 text-green-400">
                                            <AlertDescription>{success}</AlertDescription>
                                        </Alert>
                                    )}

                                    <form onSubmit={handleProfileSubmit}>
                                        <div className="space-y-4">
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
                                                        value={profileForm.username}
                                                        onChange={handleProfileChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                </div>
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
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={profileForm.email}
                                                        onChange={handleProfileChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="avatar" className="text-slate-300">
                                                    Avatar URL
                                                </Label>
                                                <div className="relative">
                                                    <Camera className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                                    <Input
                                                        id="avatar"
                                                        name="avatar"
                                                        placeholder="https://example.com/avatar.jpg"
                                                        value={profileForm.avatar}
                                                        onChange={handleProfileChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio" className="text-slate-300">
                                                    Bio
                                                </Label>
                                                <Textarea
                                                    id="bio"
                                                    name="bio"
                                                    placeholder="Tell us about yourself"
                                                    value={profileForm.bio}
                                                    onChange={handleProfileChange}
                                                    className="bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500 min-h-24"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center">
                                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                        Updating...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Changes
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </TabsContent>

                                {/* Security Tab */}
                                <TabsContent value="security" className="mt-0">
                                    {error && (
                                        <Alert className="mb-4 bg-red-500/10 border-red-500/30 text-red-400">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {success && (
                                        <Alert className="mb-4 bg-green-500/10 border-green-500/30 text-green-400">
                                            <AlertDescription>{success}</AlertDescription>
                                        </Alert>
                                    )}

                                    <form onSubmit={handlePasswordSubmit}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="currentPassword" className="text-slate-300">
                                                    Current Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                                    <Input
                                                        id="currentPassword"
                                                        name="currentPassword"
                                                        type={showPassword ? "text" : "password"}
                                                        value={passwordForm.currentPassword}
                                                        onChange={handlePasswordChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 pr-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                                                    >
                                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <Separator className="bg-slate-700/50" />

                                            <div className="space-y-2">
                                                <Label htmlFor="newPassword" className="text-slate-300">
                                                    New Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                                    <Input
                                                        id="newPassword"
                                                        name="newPassword"
                                                        type={showNewPassword ? "text" : "password"}
                                                        value={passwordForm.newPassword}
                                                        onChange={handlePasswordChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 pr-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                                                    >
                                                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword" className="text-slate-300">
                                                    Confirm New Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                                    <Input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={passwordForm.confirmPassword}
                                                        onChange={handlePasswordChange}
                                                        className="bg-slate-800/50 border-slate-700 pl-10 pr-10 text-slate-300 placeholder:text-slate-500 focus:ring-cyan-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-slate-800/30 rounded-md p-3 border border-slate-700/50 text-xs text-slate-400">
                                                <p className="font-medium text-slate-300 mb-1">Password Requirements:</p>
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>Minimum 8 characters long</li>
                                                    <li>Include at least one uppercase letter</li>
                                                    <li>Include at least one number</li>
                                                    <li>Include at least one special character</li>
                                                </ul>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center">
                                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                        Updating Password...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Change Password
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
