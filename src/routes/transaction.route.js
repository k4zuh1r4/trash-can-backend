import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"
import {
    getTransactions,
    createTransaction,
    getAllTransactions,
    getPendingTransactions,
    approveTransaction,
    rejectTransaction
} from "../controllers/transaction.controller.js"

const router = express.Router()

router.get("/list", protectRoute, getTransactions)
router.post("/create", protectRoute, createTransaction)

router.get("/all", protectRoute, authorizeRoles("admin"), getAllTransactions)

router.get("/pending", protectRoute, authorizeRoles("distributor", "admin"), getPendingTransactions)
router.put("/approve/:id", protectRoute, authorizeRoles("distributor", "admin"), approveTransaction)
router.put("/reject/:id", protectRoute, authorizeRoles("distributor", "admin"), rejectTransaction)

export default router