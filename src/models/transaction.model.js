import mongoose from "mongoose"
const transactionSchema = new mongoose.Schema({
    contributorID: {
        type: String,
        unique: false,
        required: true,
    },
    contributorName: {
        type: String,
        unique: false,
        required: true
    },
    contactNumber: {
        type: String,
        unique: false,
        required: true,
    },
    trashName: {
        type: String,
        unique: false,
        required: true,
    },
    trashType: {
        type: String,
        unique: false,
        required: true,
    },
    trashImage: {
        type: String,
        unique: false,
        required: true,
    },
    addedBalance: {
        type: Number,
        unique: false,
        required: true,
        default: 0.0
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction