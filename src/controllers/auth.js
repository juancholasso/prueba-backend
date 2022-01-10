const bcryptjs = require('bcryptjs');
let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('../models/user')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');

/**
 * Generate JWT for authorization end points
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.generateJWT = async (res, req) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ where: { email : email }});

    if(user == null){
        return res.status(400).json({
            "msg": "E-mail and password invalid",
            "param": "email",
            "location": "body"
        }); 
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if(!validPassword){
        return res.status(400).json({
            "msg": "E-mail and password invalid",
            "param": "email",
            "location": "body"
        }); 
    }

    var token = jwt.sign({
        data: user
    }, 'secret', { expiresIn: 60 * 60 });

    return res.json({
        user: user.toJSON(),
        token: token
    });
}

module.exports.getAuth = async (res, req)=>{
    return res.json(req.user);
}