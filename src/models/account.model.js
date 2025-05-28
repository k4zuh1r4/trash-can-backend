import mongoose from "mongoose"
const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    contactNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'distributor', 'admin'],
        default: 'user'
    },
    balance: {
        type: Number,
        default: 0.0
    },
    walletAddress: {
        type: String,
        unique: true,
    },
}, { timestamps: true })

const Account = mongoose.model("Account", accountSchema)
export default Account