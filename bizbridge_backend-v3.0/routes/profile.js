// routes/profile.js
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const authMiddleware = require('../middleware/authMiddleware');

// Get profile (requires authentication)
router.get('/', authMiddleware.verifyToken, ProfileController.getProfile);

// Update profile (requires authentication)
router.put('/', authMiddleware.verifyToken, ProfileController.updateProfile);

// Delete account (requires authentication)
router.delete('/', authMiddleware.verifyToken, ProfileController.deleteAccount);

module.exports = router;
