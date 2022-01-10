var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const paginate = require('express-paginate');
var passport = require('passport')

var authRouter = require('./src/routes/auth');
var categoryRouter = require('./src/routes/category');
var productRouter = require('./src/routes/product');

require('./src/middleware/passport');

var app = express();

var sequelize = require('./src/config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(paginate.middleware(5, 10));
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

run();

async function run() {
    try {
        const PORT = process.env.PORT || 8000;

        await sequelize.authenticate();
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:8000`)
        });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}