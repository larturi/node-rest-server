const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
})

module.exports = model('Category', CategorySchema);