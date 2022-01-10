var express = require('express');
var router = express.Router();
var passport = require('passport');

const productController = require('../controllers/product');

/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    productController.list(res, req);
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    productController.get(res, req);
});

router.put('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    productController.create(res, req);
});

router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    productController.update(res, req);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    productController.delete(res, req);
});

module.exports = router;
