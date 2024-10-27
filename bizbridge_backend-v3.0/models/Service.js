const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true,
    },
    duration: {
        type: Number,
        required: true, // in minutes
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Service', serviceSchema);
