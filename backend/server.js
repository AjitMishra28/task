
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")

const enrichRoute = require("./routes/enrich")

const app = express()

app.use(express.json())

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}))

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 50
}))

app.get("/api/health", (req,res)=>{
  res.json({ status: "ok" })
})

app.use("/api/enrich", enrichRoute)

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server running on", port))
