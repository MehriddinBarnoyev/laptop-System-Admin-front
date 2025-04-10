import axios from "axios"

export const getSystemStats = async () => {
  try {
    console.log("Fetching system stats from API...")
    const res = await axios.get("http://localhost:8000/system-stats")
    console.log("System stats received:", res.data)
    return res.data
  } catch (error) {
    console.error("Error fetching system stats:", error)
    return null
  }
}

