const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware
const { verifyToken, isCustomer, isMerchant } = authMiddleware;

// Customer route to add a review for a completed service
router.post('/', verifyToken, isCustomer, ReviewController.addReview);

// Public route to get reviews for a specific service
router.get('/service/:serviceId', ReviewController.getServiceReviews);

// Public route to get reviews for a specific merchant
router.get('/merchant/:merchantId', ReviewController.getMerchantReviews);

module.exports = router;
