import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import transactionRoutes from './routes/transaction.route.js'
import { OpenConnection } from './lib/database.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(express.json());
app.use(cookieParser())
const PORT = process.env.PORT
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    OpenConnection()
})