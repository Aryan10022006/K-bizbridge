// controllers/CustomerController.js

const Customer = require('../models/Customer');

// Get customer profile
exports.getProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password');
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        res.status(200).json({ customer });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile", error: error.message });
    }
};

// Update customer profile
exports.updateProfile = async (req, res) => {
    const { username, phone } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.user.id,
            { username, phone },
            { new: true, select: '-password' }
        );
        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

        res.status(200).json({ message: "Profile updated", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};
