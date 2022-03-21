'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.journey, {
        as: "journey",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.bookmark, {
        as: "bookmark",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.fitur, {
        as: "fitur",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};