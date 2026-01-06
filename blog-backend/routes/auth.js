const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Cleaned up duplicate declaration

// 1. Setup the Email Transporter

// 1. Setup the Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Debug log to ensure variables are actually loading
console.log("Checking Email Config: ", process.env.EMAIL_USER ? "Email Found" : "Email MISSING");

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Email Provider Error:", error);
    } else {
        console.log("✅ Email Server is ready to send OTPs");
    }

});

// 2. SIGNUP ROUTE (Sends OTP)
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Check if the EMAIL is already taken and verified
        const existingEmail = await User.findOne({ email });
        if (existingEmail && existingEmail.isVerified) {
            return res.status(400).json({ msg: "Email already exists." });
        }

        // 2. Check if the USERNAME is already taken by someone else
        // We look for the username, but exclude the current email 
        // (in case the same user is just retrying their own signup)
        const existingUsername = await User.findOne({ username, email: { $ne: email } });
        if (existingUsername) {
            return res.status(400).json({ msg: "Username is already taken. Please choose another." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save or update temporary user
        await User.findOneAndUpdate(
            { email },
            { username, password: hashedPassword, otp, isVerified: false },
            { upsert: true, new: true }
        );

        // 4. Send Email
        await transporter.sendMail({
            from: `"The Masterpiece" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Verification Code",
            text: `Your OTP is: ${otp}`,
            html: `<div style="text-align:center;"><h2>Code: ${otp}</h2></div>`
        });

        res.status(200).json({ msg: "OTP sent to email" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. VERIFY OTP ROUTE
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (user && user.otp === otp) {
            user.isVerified = true;
            user.otp = null; // Clear OTP so it can't be used again
            await user.save();
            res.status(200).json({ msg: "Account verified successfully!" });
        } else {
            res.status(400).json({ msg: "Invalid OTP" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. LOGIN ROUTE (Now with Verification Check)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        // IMPORTANT: Prevent unverified users from logging in
        if (!user.isVerified) {
            return res.status(401).json({ msg: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;