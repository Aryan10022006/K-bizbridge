const Merchant = require('../models/Merchant');

exports.searchMerchants = async (req, res) => {
    try {
        const { service, location, rating, availability } = req.query;

        let query = {};

        // Adding filters to query based on the parameters provided
        if (service) query['services.category'] = service;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (rating) query.rating = { $gte: Number(rating) };
        if (availability) query['services.availability'] = availability;

        const merchants = await Merchant.find(query);
        res.json({ merchants });
    } catch (error) {
        console.error("Error in searchMerchants:", error);
        res.status(500).json({ message: 'Error retrieving merchants' });
    }
};
