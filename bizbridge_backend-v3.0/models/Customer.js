const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    bookings: [
        {
            merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
            service: { type: String },
            timeSlot: { type: String },
            status: { type: String, default: 'Pending' },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Customer', customerSchema);
