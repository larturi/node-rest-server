const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    const { limit = 5, init = 0 } = req.query;
    const filter = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
        .skip(Number(init))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users,
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
    const { _id, password, google, email, ...user } = req.body;

    if (password) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, user);

    res.status(200).json(userUpdated);


}

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}