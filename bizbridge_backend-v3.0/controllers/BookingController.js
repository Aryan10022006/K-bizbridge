const Booking = require('../models/Booking');
const NotificationController = require('./NotificationController');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { serviceId, bookingDate } = req.body;
        const booking = new Booking({
            customerId: req.user.id,
            merchantId: req.body.merchantId,
            serviceId,
            bookingDate,
        });
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get bookings for a customer
exports.getCustomerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customerId: req.user.id }).populate('serviceId merchantId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Get bookings for a merchant
exports.getMerchantBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ merchantId: req.user.id }).populate('serviceId customerId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};
await NotificationController.createNotification(
    merchantId,
    `A new booking was made by ${req.user.username}`,
    'booking'
);

// Update booking status (e.g., confirm, complete, cancel)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
};
