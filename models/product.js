const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: { type: Number, default: 0 },
    description: { type: String },
    disponible: { type: Boolean, default: true },
});

// Sobreescribo el metodo para que no muestre el el response el password
ProductSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);