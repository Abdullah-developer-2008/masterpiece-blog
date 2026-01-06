const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String }, // Store the 6-digit code
    isVerified: { type: Boolean, default: false } // Account stays locked until OTP is correct
});

module.exports = mongoose.model('User', userSchema);