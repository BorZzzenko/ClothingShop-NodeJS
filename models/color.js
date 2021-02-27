const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Color', colorSchema, 'color');