'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here'
      User.belongsToMany(models.Artwork, {
        through: models.Collection,
        foreignKey: 'userId',
        otherKey: 'artId'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username is already exists'
      },
      validate: {
        notEmpty: {args: true, msg: `Username cannot be empty` },
        notNull: { args: true, msg: `Username cannot be empty` }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already exists'
      },
      validate: {
        notEmpty: {args: true, msg: `Email cannot be empty` },
        notNull: { args: true, msg: `Email cannot be empty` },
        isEmail: { 
          args: true,
          msg: `Invalid email format` 
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password cannot be empty`
        },
        notNull: {
          msg: `Password cannot be empty`
        },
        passwordLength() {
          if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};