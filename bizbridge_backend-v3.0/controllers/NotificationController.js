const Notification = require('../models/Notification');

// Add a new notification
exports.addNotification = async (user, userType, message) => {
    const newNotification = new Notification({
        user,
        userType,
        message
    });
    await newNotification.save();
};

// Fetch all notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        await Notification.updateOne({ _id: req.params.notificationId }, { isRead: true });
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error });
    }
};
