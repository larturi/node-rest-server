const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const login = async(req = request, res = response) => {

    res.json({
        msg: "Login OK"
    });
}

module.exports = {
    login,
}