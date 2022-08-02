const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');

router.post('/home', clientController.createHouse);

module.exports = router;
