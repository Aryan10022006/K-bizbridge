const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch all notifications for the logged-in user
router.get('/', authMiddleware.verifyToken, notificationController.getUserNotifications);

// Mark a specific notification as read
router.patch('/:notificationId/read', authMiddleware.verifyToken, notificationController.markAsRead);

module.exports = router;
