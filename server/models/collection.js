'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.Artwork, {
        foreignKey: 'artId'
      });
      Collection.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Collection.init({
    artId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: `artId cannot be empty` },
        notNull: { args: true, msg: `artId cannot be empty` }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {args: true, msg: `userId cannot be empty` },
        notNull: { args: true, msg: `userId cannot be empty` }
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Please add a notes to your collection',
      validate: {
        notEmpty: {args: true, msg: `Notes cannot be empty` },
        notNull: { args: true, msg: `Notes cannot be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};