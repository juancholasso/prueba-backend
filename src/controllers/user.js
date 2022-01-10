let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const User = require('../models/user')(sequelize, DataTypes);
const { validationResult } = require('express-validator');
// const paginate = require('express-paginate');

// module.exports.get = async (res, req)=>{
//     let users = await User.findAll({
//         offset: req.skip, 
//         limit: req.query.limit
//     });

//     const itemCount = await User.count();
//     const pageCount = Math.ceil(itemCount / req.query.limit);

//     res.json({
//         data: users,
//         pageCount,
//         itemCount,
//         pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
//     }, 200);
// }

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

// const userUpdate = async (res, req)=>{
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     let body = req.body;
//     if(body.password){
//         body.password = bcryptjs.hashSync(body.password, bcryptjs.genSaltSync())
//     }

//     if(body.email){
//         let userSearch = await User.findOne({ where: { email: body.email } });
//         if(userSearch.id != req.params.id){
//             return res.status(400).json({
//                 "value": userSearch.email,
//                 "msg": "E-mail already in use",
//                 "param": "email",
//                 "location": "body"
//             });
//         }
//     }

//     await User.update(body, 
//     {
//         where: {
//           id: req.params.id
//         }
//     });
//     let user = await User.findByPk(req.params.id);
//     res.json(user,200);
// }

// const userDelete = async (res, req)=>{
//     let user = await User.findByPk(req.params.id);
//     await User.destroy({
//         where: {
//             id: req.params.id
//         }
//     });
//     res.json(user,200);
// }