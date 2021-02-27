const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    imagePath: String,
    sizes: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    color_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Clothes', clothesSchema);