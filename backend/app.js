import express from "express"
import cors from "cors"
import corsOptions from "./config/cors.js"

import dotenv from "dotenv"
import ConnectDB from "./config/connectDB.js"

import authRoutes from "./routes/auth.routes.js"
import sessionRoutes from "./routes/session.routes.js"
import generateRoutes from "./routes/generateCode.routes.js"

const app = express()

dotenv.config()

app.use(express.json())
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));

ConnectDB()

app.get("/", (req, res) => {
    res.send("compflow backend is running.")
})


app.use("/api/sessions",sessionRoutes)
app.use("/api/session",sessionRoutes)

app.use("/api/session",generateRoutes)

app.use("/api", authRoutes)


app.listen(PORT, () => {
    console.log("backend is running on port:", PORT);
})