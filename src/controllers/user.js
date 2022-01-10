let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const User = require('../models/user')(sequelize, DataTypes);
const { validationResult } = require('express-validator');

/**
 * Create a new User
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.create = async (res, req)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let body = req.body;
    body.password = bcryptjs.hashSync(body.password, bcryptjs.genSaltSync())

    let user = await User.create(req.body);
    await user.save();
    res.json(user,201);
}