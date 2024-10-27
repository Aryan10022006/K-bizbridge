const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    reviewText: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Review', reviewSchema);
