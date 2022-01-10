let sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Product = require('../models/product')(sequelize, DataTypes);
const Category = require('../models/category')(sequelize, DataTypes);
const { Op } = require("sequelize");
const Joi = require('joi');
const http_codes = require('http-status-codes').StatusCodes

/**
 * Create a new Product
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.create = async (res, req)=>{
    try{
        //Validation body request -----
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            category_id: Joi.number().required(),
        })

        let validation = schema.validate(req.body);
        if(validation.error){
            res.json(validation.error.details, http_codes.BAD_REQUEST);
            return;
        }
        //End Validation body request -----

        //Check if exist Category
        const category = await Category.findByPk(req.body.category_id);
        if(category === null){
            res.json({
                message: 'Category does not exist',
                path: [ 'category_id' ],
                type: 'any.not_exist',
                context: { label: 'category_id', key: 'category_id' }
            }, http_codes.BAD_REQUEST);
            return;
        }
        //End check if exist Category

        let data = req.body;
        data.user_id = req.user.id;

        let product = await Product.create(data);

        res.json(product, http_codes.CREATED);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}

/**
 * Get Product by id
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.get = async (res, req)=>{
    try{
        let product = await Product.findByPk(req.params.id);
        res.json(product, 200);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}

/**
 * Get list of products
 * @param {*} res 
 * @param {*} req 
 * @returns JSON Array
 */
module.exports.list = async (res, req)=>{
    try{
        let filter = {};

        if(req.query.title){
            filter.title = {
                [Op.substring] : req.query.title
            }
        }

        if(req.query.category_id){
            filter.category_id = req.query.category_id
        }

        let products = await Product.findAll({where : filter});
        res.json(products, 200);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}

/**
 * Update a product
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.update = async (res, req)=>{
    try{
        let product = await Product.findByPk(req.params.id);

        //Check if exist product
        if(product === null){
            res.json({
                message: 'Product does not exist'
            }, http_codes.NOT_ACCEPTABLE);
            return;
        }

        //Validation body request -----
        const schema = Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            price: Joi.number().optional(),
            category_id: Joi.number().optional(),
        })

        let validation = schema.validate(req.body);
        if(validation.error){
            res.json(validation.error.details, http_codes.BAD_REQUEST);
            return;
        }
        //End Validation body request -----

        //Check if exist Category
        if(req.body.category_id){
            const category = await Category.findByPk(req.body.category_id);
            if(category === null){
                res.json({
                    message: 'Category does not exist',
                    path: [ 'category_id' ],
                    type: 'any.not_exist',
                    context: { label: 'category_id', key: 'category_id' }
                }, http_codes.BAD_REQUEST);
                return;
            }
        }
        //End check if exist Category

        let data = req.body;
        data.user_id = req.user.id;
    
        product = await product?.update(data)
        res.json(product, 200);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}

/**
 * Remove a product
 * @param {*} res 
 * @param {*} req 
 * @returns JSON
 */
module.exports.delete = async (res, req)=>{
    try{
        let product = await Product.findByPk(req.params.id);
        await product?.destroy();
    
        res.json(200);
        return;
    }
    catch(err){
        console.error(err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json();
        return;
    }
}