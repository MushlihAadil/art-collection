const { Collection, User } = require('../models');

const authorization = async (req, res, next) => {
    try {
      let user = await User.findByPk(req.user.id);
      let collection = await Collection.findAll();
      let userId = collection[0].dataValues.userId;
      
      if (!collection) {
        throw { name: "CollectionNotFound" };
      }
  
      if (user.id !== userId) {
        throw { name: "Forbidden" };
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { authorization };