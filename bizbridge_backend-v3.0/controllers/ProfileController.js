// controllers/ProfileController.js
const Customer = require('../models/Customer');
const Merchant = require('../models/Merchant');

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let user;
        if (role === 'customer') {
            user = await Customer.findById(userId).select('-password');
        } else if (role === 'merchant') {
            user = await Merchant.findById(userId).select('-password');
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const updates = req.body;

        let user;
        if (role === 'customer') {
            user = await Customer.findByIdAndUpdate(userId, updates, { new: true, select: '-password' });
        } else if (role === 'merchant') {
            user = await Merchant.findByIdAndUpdate(userId, updates, { new: true, select: '-password' });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let user;
        if (role === 'customer') {
            user = await Customer.findByIdAndDelete(userId);
        } else if (role === 'merchant') {
            user = await Merchant.findByIdAndDelete(userId);
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount,
};
