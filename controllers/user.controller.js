const { response } = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: "GET Api"
    });
}

const createUser = (req, res = response) => {
    res.status(201).json({
        msg: "POST Api"
    });
}

const updateUser = (req, res = response) => {
    res.json({
        msg: "PUT Api"
    });
}

const patchUser = (req, res = response) => {
    res.json({
        msg: "PATCH Api"
    });
}

const deleteUser = (req, res = response) => {
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