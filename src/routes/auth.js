var express = require('express');
var router = express.Router();
const { checkSchema } = require('express-validator');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
let validatorConfig = require('../config/validator.json');
let emailMiddleware = require('../middleware/email');

router.post('/signup', [
        checkSchema(validatorConfig.user),
        emailMiddleware.checkExistEmail
    ], (req, res, next) => {
    userController.create(res,req)
});

router.post('/login', (req, res, next) => {
    authController.generateJWT(res,req)
}); 

module.exports = router;
