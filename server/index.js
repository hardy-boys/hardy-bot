require('dotenv').config();

const db = require('../database/models/index');

//
// ─── MODULE IMPORTS ─────────────────────────────────────────────────────
//
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

//
// ─── ROUTE IMPORTS ─────────────────────────────────────────────────────
//
const profile = require('./routes/profile');
//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────
//

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(morgan('dev'));

//
// ─── ROUTE MIDDLEWARE ─────────────────────────────────────────────────────
//

app.use(profile);

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//

db.models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000!');
  });
});

