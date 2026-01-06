require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
// 1. MIDDLEWARE (Must come first!)
// This allows the "Preflight" requests to pass
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:5500', 'http://localhost:5501'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// This allows us to read JSON data from the frontend
app.use(express.json());

// 2. CONNECT DATABASE


// 3. ROUTES (Must come after Middleware)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

