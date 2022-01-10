var express = require('express');
var router = express.Router();
var passport = require('passport');

const categoryController = require('../controllers/category');

/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    categoryController.get(res, req);
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    categoryController.create(res, req);
});

module.exports = router;
