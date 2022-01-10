const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('postgres://qqlcshryxntcen:8d4b8ad31b397fb25c211c2573f18b35270246f9d9e0855c42b65436c06d5d19@ec2-3-232-22-121.compute-1.amazonaws.com:5432/dfduc31h7ik3jh') // Example for postgres

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('dfduc31h7ik3jh', 'qqlcshryxntcen', '8d4b8ad31b397fb25c211c2573f18b35270246f9d9e0855c42b65436c06d5d19', {
    host: 'ec2-3-232-22-121.compute-1.amazonaws.com',
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
