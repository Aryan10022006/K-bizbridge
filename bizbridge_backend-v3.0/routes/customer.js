// routes/customer.js

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/CustomerController');
const { verifyToken, isCustomer } = require('../middleware/auth');

// Protected routes for customers
router.get('/profile', verifyToken, isCustomer, getProfile);
router.put('/profile', verifyToken, isCustomer, updateProfile);

module.exports = router;
