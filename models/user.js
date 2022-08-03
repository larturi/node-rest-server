const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El Email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El Password es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Sobreescribo el metodo para que no muestre el el response el password
UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);