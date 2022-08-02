const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');

router.post('/home', clientController.createHouse);
router.get('/home', clientController.getHouses);

router.get('/postCode', clientController.getPostCode);

module.exports = router;
