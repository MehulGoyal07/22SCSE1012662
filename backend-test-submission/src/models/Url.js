const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    clicks: [{
        timestamp: { type: Date, default: Date.now },
        referrer: String,
        ip: String,
        country: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Url', UrlSchema);