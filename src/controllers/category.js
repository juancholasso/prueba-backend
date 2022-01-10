let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Category = require('../models/category')(sequelize, DataTypes);
const Joi = require('joi');
const http_codes = require('http-status-codes').StatusCodes

/**
 * Create new category
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.create = async (res, req)=>{
    try{
        //Validation body request -----
        const schema = Joi.object({
            title: Joi.string().required()
        })

        let validation = schema.validate(req.body);
        if(validation.error){
            res.json(validation.error.details, http_codes.BAD_REQUEST);
            return;
        }
        //End Validation body request -----


        let category = await Category.create(req.body);
        await category.save();
    
        res.json(category,201);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}

/**
 * Get list of Categories
 * @param {*} res 
 * @param {*} req 
 * @returns JSON Array
 */
module.exports.get = async (res, req)=>{
    try{
        let categories = await Category.findAll();
        res.json(categories, 200);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}