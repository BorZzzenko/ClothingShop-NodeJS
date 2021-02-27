const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Category', categorySchema, 'category');