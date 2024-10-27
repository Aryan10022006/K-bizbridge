const Review = require('../models/Review');
const Booking = require('../models/Booking');

// Add a new review (customer-only)
exports.addReview = async (req, res) => {
    try {
        const { serviceId, rating, reviewText } = req.body;

        // Check if the customer has booked this service
        const booking = await Booking.findOne({
            customerId: req.user.id,
            serviceId: serviceId,
            status: 'completed', // Only allow reviews for completed bookings
        });

        if (!booking) {
            return res.status(403).json({ message: 'You must complete the service to leave a review' });
        }

        const review = new Review({
            customerId: req.user.id,
            merchantId: booking.merchantId,
            serviceId,
            rating,
            reviewText,
        });

        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

// Get reviews for a specific service
exports.getServiceReviews = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const reviews = await Review.find({ serviceId }).populate('customerId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
    }
};

// Get reviews for a specific merchant
exports.getMerchantReviews = async (req, res) => {
    try {
        const { merchantId } = req.params;
        const reviews = await Review.find({ merchantId }).populate('customerId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
    }
};
