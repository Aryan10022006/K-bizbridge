// routes/merchant.js

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/MerchantController');
const { verifyToken, isMerchant } = require('../middleware/auth');

// Protected routes for merchants
router.get('/profile', verifyToken, isMerchant, getProfile);
router.put('/profile', verifyToken, isMerchant, updateProfile);

module.exports = router;
