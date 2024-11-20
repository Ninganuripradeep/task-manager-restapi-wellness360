const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const globalErrorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongodb connected');
}).catch(err => {
    console.log('mongodb connection failed', err);
});

// Task routes
app.use('/api', taskRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Global error handler middleware
app.use(globalErrorHandler);

// Export the app for testing
module.exports = app;

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
