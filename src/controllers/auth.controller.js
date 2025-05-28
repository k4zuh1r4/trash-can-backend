import { generateToken } from "../lib/utils.js"
import Account from "../models/account.model.js"
import bcrypt from "bcryptjs"
export const register = async (req, res) => {
    const { email, fullName, password, contactNumber, role, walletAddress } = req.body
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        if (!email || !password || !fullName || !contactNumber) {
            return res.status(400).json({ message: "Please fill all fields" })
        }
        const account = await Account.findOne({ email })
        if (account) {
            return res.status(400).json({ message: "Account already exists" })
        }

        // Validate role
        const validRoles = ['user', 'distributor', 'admin']
        const userRole = role && validRoles.includes(role) ? role : 'user'

        const hashedPassword = await bcrypt.hash(password, 10)
        const newAccount = await Account.create({
            email,
            fullName,
            password: hashedPassword,
            contactNumber,
            role: userRole,
            balance: 0.0,
            walletAddress
        })
        if (newAccount) {
            generateToken(newAccount._id, res)
            await newAccount.save()
            res.status(201).json({
                _id: newAccount._id,
                email: newAccount.email,
                fullName: newAccount.fullName,
                contactNumber: newAccount.contactNumber,
                role: newAccount.role,
                balance: newAccount.balance,
                walletAddress: newAccount.walletAddress
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const account = await Account.findOne({ email })
        if (!account) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, account.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = generateToken(account._id, res)
        res.status(200).json({
            _id: account._id,
            email: account.email,
            fullName: account.fullName,
            contactNumber: account.contactNumber,
            role: account.role,
            balance: account.balance,
            walletAddress: account.walletAddress,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}