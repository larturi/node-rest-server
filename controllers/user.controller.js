const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
    const {
        q,
        name,
        apikey,
        page = 1,
        limit
    } = req.query;

    res.json({
        q,
        name,
        apikey,
        page,
        limit
    });
}

const createUser = async(req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        user
    });
}

const updateUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { password, google, email, ...user } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, user);

    res.status(200).json({
        userUpdated
    });


}

const patchUser = (req = request, res = response) => {
    res.json({
        msg: "PATCH Api"
    });
}

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: "DELETE Api"
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
}