import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getTransactions, createTransaction } from "../controllers/transaction.controller.js"
const router = express.Router()

router.get("/list", protectRoute, getTransactions)
router.post("/create", protectRoute, createTransaction)
export default router