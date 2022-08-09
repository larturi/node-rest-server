const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, 'El campo isActive es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El campo user es obligatorio']
    }
})

module.exports = model('Category', CategorySchema);