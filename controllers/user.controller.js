const { request, response } = require('express');

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

const createUser = (req = request, res = response) => {
    const { name, age } = req.body;

    res.status(201).json({
        name,
        age
    });
}

const updateUser = (req = request, res = response) => {
    const id = req.params.id;
    res.json({
        id
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