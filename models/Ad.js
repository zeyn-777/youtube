const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    imgUrl: { type: String, required: true },
    targetUrl: { type: String, required: true },
    title: String,
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', AdSchema);

