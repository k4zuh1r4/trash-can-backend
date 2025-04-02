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
export const createTransaction = async (req, res) => {
    try {
        const { trashName, trashType, trashImage, addedBalance } = req.body;
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
        })
        const savedTransaction = await newTransaction.save();
        const updatedAccount = await Account.findByIdAndUpdate(
            accountID,
            { $inc: { balance: addedBalance } },
            { new: true }
        );
        res.status(201).json({ transaction: savedTransaction, account: updatedAccount });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}