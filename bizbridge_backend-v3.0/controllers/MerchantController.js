// controllers/MerchantController.js

const Merchant = require('../models/Merchant');

// Get merchant profile
exports.getProfile = async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.user.id).select('-password');
        if (!merchant) return res.status(404).json({ message: "Merchant not found" });

        res.status(200).json({ merchant });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile", error: error.message });
    }
};

// Update merchant profile
exports.updateProfile = async (req, res) => {
    const { username, phone, businessName } = req.body;

    try {
        const updatedMerchant = await Merchant.findByIdAndUpdate(
            req.user.id,
            { username, phone, businessName },
            { new: true, select: '-password' }
        );
        if (!updatedMerchant) return res.status(404).json({ message: "Merchant not found" });

        res.status(200).json({ message: "Profile updated", merchant: updatedMerchant });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};
