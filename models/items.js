const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    imageUrl: String,
    author: String,
    url: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Item', itemsSchema);
