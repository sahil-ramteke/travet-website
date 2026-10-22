const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);  // add this line
// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());           // Allow cross-origin requests
app.use(express.json());   // Parse JSON request bodies

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Add this line to connect auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));