import Transaction from "../models/transaction.model.js"
import Account from "../models/account.model.js"
export const getTransactions = async (req, res) => {
    try {
        const loggedInAccountID = req.account._id
        const accountTransactions = await Transaction.find({ contributorID: loggedInAccountID })
        res.status(200).json({ accountTransactions })
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
export const createTransaction = async (req, res) => {
    try {
        const { trashName, trashType, trashImage, addedBalance, contractID } = req.body
        const accountID = req.account._id
        const accountName = req.account.fullName
        const accountContactNumber = req.account.contactNumber
        const newTransaction = new Transaction({
            contributorID: accountID,
            contributorName: accountName,
            contactNumber: accountContactNumber,
            trashName,
            trashType,
            trashImage,
            addedBalance,
            contractID
        })
        const savedTransaction = await newTransaction.save()

        // Remove the balance update here - balance will only be added after approval

        res.status(201).json({
            transaction: savedTransaction,
            message: "Transaction created successfully and waiting for approval"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const getPendingTransactions = async (req, res) => {
    try {
        const pendingTransactions = await Transaction.find({ status: "pending" })
        res.status(200).json({ pendingTransactions })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const approveTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const transaction = await Transaction.findById(id)

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" })
        }

        // Check if transaction is already approved to prevent double-processing
        if (transaction.status === "approved") {
            return res.status(400).json({ message: "Transaction already approved" })
        }

        // Update transaction status
        transaction.status = "approved"
        await transaction.save()

        // Add balance to user account only after approval
        const updatedAccount = await Account.findByIdAndUpdate(
            transaction.contributorID,
            { $inc: { balance: transaction.addedBalance } },
            { new: true }
        )

        res.status(200).json({
            transaction,
            message: `Transaction approved. ${transaction.addedBalance} added to user's balance.`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const rejectTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const transaction = await Transaction.findById(id)

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" })
        }

        if (transaction.status !== "pending") {
            return res.status(400).json({
                message: `Cannot reject transaction with status: ${transaction.status}`
            })
        }

        // Update transaction status to rejected
        transaction.status = "rejected"
        await transaction.save()

        res.status(200).json({
            transaction,
            message: "Transaction rejected"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}