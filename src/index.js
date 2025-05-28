import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import transactionRoutes from './routes/transaction.route.js'
import adminRoutes from './routes/admin.route.js'
import { OpenConnection } from './lib/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/admin", adminRoutes)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    OpenConnection()
})