const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

