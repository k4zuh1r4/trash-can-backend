import Account from "../models/account.model.js"
import Transaction from "../models/transaction.model.js"

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().select("-password")
        res.status(200).json({ accounts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateAccountRole = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body

        // Validate role
        const validRoles = ['user', 'distributor', 'admin']
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" })
        }
        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password")

        if (!updatedAccount) {
            return res.status(404).json({ message: "Account not found" })
        }

        res.status(200).json({ account: updatedAccount })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.status(200).json({ transactions })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}