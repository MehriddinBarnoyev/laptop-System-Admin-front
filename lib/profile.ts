import axios from "axios"

const API_URL = "http://localhost:8000"

interface ProfileData {
  username?: string
  email?: string
  currentPassword?: string
  newPassword?: string
  avatar?: string
  bio?: string
}

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("auth_token")

    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("Profile response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error fetching profile:", error)
    throw error
  }
}

export const updateUserProfile = async (profileData: ProfileData) => {
  try {
    const token = localStorage.getItem("auth_token")

    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await axios.put(`${API_URL}/api/user/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("Profile update response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error updating profile:", error)
    throw error
  }
}

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const token = localStorage.getItem("auth_token")

    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await axios.put(
      `${API_URL}/api/user/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    console.log("Password change response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error changing password:", error)
    throw error
  }
}
