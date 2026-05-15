const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const jobRoutes = require('./routes/jobRoutes');


// Initialize Express app
const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected successfully!'))
.catch(err => console.error('Connection error:', err));


// Routes
app.use('/api/jobs', jobRoutes);


// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong!" });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));