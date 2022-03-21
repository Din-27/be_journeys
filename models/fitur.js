'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fitur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      fitur.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      fitur.belongsTo(models.journey, {
        as: "journeyFitur",
        foreignKey: {
          name: "idJourney",
        },
      });
    }
  }
  fitur.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fitur',
  });
  return fitur;
};