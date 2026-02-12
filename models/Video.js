const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true }, // YouTube Video ID
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Video', VideoSchema);

