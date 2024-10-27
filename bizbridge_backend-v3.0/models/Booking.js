const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true,
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Booking', bookingSchema);
