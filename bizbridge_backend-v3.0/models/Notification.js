const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: 'userType',
        required: true
    },
    userType: {
        type: String,
        enum: ['Customer', 'Merchant'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
