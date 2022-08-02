const { House } = require('../models');

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
      message: 'Home created successfully',
      house,
    });
  } catch (error) {
    next(error);
  }
};
