import axios from "axios"

const api = axios.create({
  baseURL: "https://api.nadjitanbetan.dayal-enterprises.com",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false 
})

export default api
