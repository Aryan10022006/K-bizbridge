const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    category: { type: String, required: true },  // E.g., "Salon", "Electrician"
    description: { type: String },
    availability: [{ type: String }],  // Array of available time slots (e.g., "9:00 AM - 12:00 PM")
    price: { type: Number },
});

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },  // E.g., "Mumbai"
    rating: { type: Number, default: 0 },
    services: [serviceSchema],  // Embedding service schema for detailed filtering
    role: { type: String, default: 'merchant' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Merchant', merchantSchema);
