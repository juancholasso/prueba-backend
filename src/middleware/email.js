const { body } = require('express-validator');
let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('../models/user')(sequelize, DataTypes);

/**
 * Check if email exist in table Users
 */
const checkExistEmail = body('email').custom(value => {
    return User.findOne({ where: { email: value } }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
})

module.exports = {
    checkExistEmail
}