import jwt from "jsonwebtoken"
import Account from "../models/account.model.js"
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const account = await Account.findById(decoded.accountID).select("-password")
        if (!account) {
            return res.status(401).json({ message: "User not found" })
        }
        req.account = account
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized" })
    }
}