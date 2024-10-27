const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware
const { verifyToken, isCustomer, isMerchant } = authMiddleware;

// Customer booking routes
router.post('/', verifyToken, isCustomer, BookingController.createBooking);
router.get('/customer', verifyToken, isCustomer, BookingController.getCustomerBookings);

// Merchant booking routes
router.get('/merchant', verifyToken, isMerchant, BookingController.getMerchantBookings);
router.put('/:bookingId/status', verifyToken, isMerchant, BookingController.updateBookingStatus);

module.exports = router;
