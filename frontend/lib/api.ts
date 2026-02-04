
import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const enrich = (prompt:string) =>
  api.post("/api/enrich", { prompt })
