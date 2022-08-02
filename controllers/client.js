const { House, sequelize } = require('../models');

//---------------------------------------------- Home ----------------------------------------------

exports.createHouse = async (req, res, next) => {
  try {
    const { name, desc, price, post_code } = req.body;
    const house = await House.create({
      name,
      desc,
      price,
      postCode: post_code,
    });
    res.status(201).json({
      house,
    });
  } catch (error) {
    next(error);
  }
};

exports.getHouses = async (req, res, next) => {
  try {
    const { skip, take } = req.query;
    const count = await House.count();
    const offset = Number(skip);
    const limit = Number(take) ? Number(take) : count;

    const houses = await House.findAll({
      attribute: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      offset,
      limit,
    });
    res.status(200).json({
      payload: houses,
      count,
    });
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------- postCode ----------------------------------------------
exports.getPostCode = async (req, res, next) => {
  try {
    const count = await House.count();
    const houses = await House.findAll({
      attributes: ['post_code'],
    });
    res.status(200).json({
      payload: houses,
      count,
    });
  } catch (error) {
    next(error);
  }
};
