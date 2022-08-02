const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

// ----------------------------- Sync to create database -----------------------------
// const { sequelize, User } = require('./models/index');
// sequelize.sync({ alter: true });
// ----------------------------- Sync to create database -----------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('', (req, res, next) => {
  console.log(req.url);
  console.log('-----------------------------------------');
  next();
});

app.listen(port, () => console.log(`\n\n\nRunning port ${port}`));
