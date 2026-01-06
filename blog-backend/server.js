const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
// This allows the "Preflight" requests to pass
app.use(cors()); 
app.use(express.json());

// 2. CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// 3. ROUTES (Must come after Middleware)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; 