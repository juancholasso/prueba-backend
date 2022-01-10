'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.Product, {
        foreignKey: 'user_id',
        as: 'products'
      });
      
    }

    toJSON(){
      var instance = this.dataValues;
      delete instance.password;
      return instance;
    }

  };

  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Users',
  });
  
  return User;
};