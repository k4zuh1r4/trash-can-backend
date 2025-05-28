import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"
import { getAllAccounts, updateAccountRole, getAllTransactions } from "../controllers/admin.controller.js"

const router = express.Router()

router.get("/accounts", protectRoute, authorizeRoles("admin"), getAllAccounts)
router.put("/accounts/:id/role", protectRoute, authorizeRoles("admin"), updateAccountRole)
router.get("/transactions", protectRoute, authorizeRoles("admin"), getAllTransactions)

export default router