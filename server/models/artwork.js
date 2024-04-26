'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artwork.belongsToMany(models.User, {
        through: models.Collection,
        foreignKey: 'artId',
        otherKey: 'userId'
      });
    }
  }
  Artwork.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Title cannot be empty`},
        notNull: { msg: `Title cannot be empty`}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Image URL cannot be empty`},
        notNull: { msg: `Image URL cannot be empty`}
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Location cannot be empty`},
        notNull: { msg: `Location cannot be empty`}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Description cannot be empty`},
        notNull: { msg: `Description cannot be empty`}
      }
    },
    date_create: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Date Create cannot be empty`},
        notNull: { msg: `Date Create cannot be empty`}
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Department cannot be empty`},
        notNull: { msg: `Department cannot be empty`}
      }
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Collection cannot be empty`},
        notNull: { msg: `Collection cannot be empty`}
      }
    },
    fun_fact: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Fun Fact cannot be empty`},
        notNull: { msg: `Fun Fact cannot be empty`}
      }
    }
  }, {
    sequelize,
    modelName: 'Artwork',
  });
  return Artwork;
};