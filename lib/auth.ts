import axios from "axios"

const API_URL = "http://localhost:8000/api"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

export const LoginUser = async (loginData: LoginData) => {
  console.log("Login data:", loginData)

  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData)
    console.log("Login response:", response.data)
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const RegisterUser = async (registerData: RegisterData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, registerData)
    return res.data
  } catch (error: any) {
    throw error
  }
}
