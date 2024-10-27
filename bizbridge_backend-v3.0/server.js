const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { verifyToken, isCustomer, isMerchant } = require('../middleware/auth');

// Connect Database
connectDB();

// Middleware for parsing JSON
app.use(express.json());
const profileRoutes = require('./routes/profile');
const serviceRoutes = require('./routes/service');
const bookingRoutes = require('./routes/booking');
const reviewRoutes = require('./routes/review'); 

// Define Routes (Placeholders for now)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/merchant', require('./routes/merchant'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/profile', profileRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
const notificationRoutes = require('./routes/notification'); // Add this line
const searchRoute = require('./routes/search');

app.use('/api/search', searchRoute);
app.use('/api/notifications', notificationRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
