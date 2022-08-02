const { House, sequelize } = require('../models');

//---------------------------------------------- Home ----------------------------------------------

exports.createHouse = async (req, res, next) => {
  try {
    const { name, desc, price, post_code } = req.body;
    if (!name || !desc || !price || !post_code) {
      throw new Error('Missing required fields');
    }
    const regexPostCode = /^[0-9]{5}$/;
    if (!regexPostCode.test(post_code)) {
      throw new Error('Invalid post code');
    }
    const regexPrice = /^[0-9]{1,}[.][0-9]{2}$/;
    if (!regexPrice.test(price)) {
      throw new Error('Invalid price');
    }
    const house = await House.create({
      name,
      desc,
      price,
      post_code,
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

exports.getAverageAndMedianPriceByPostCodeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houses = await House.findAll({
      where: {
        post_code: id,
      },
      attributes: ['price'],
    });
    const prices = houses.map((house) => Number(house.price));
    const average = prices.reduce((a, b) => a + b, 0) / prices.length;
    const median =
      prices.length % 2 === 0
        ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
        : prices[(prices.length - 1) / 2];
    res.status(200).json({
      payload: {
        average,
        median,
      },
    });
  } catch (error) {
    next(error);
  }
};
