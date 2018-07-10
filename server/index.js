require('dotenv').config();

const db = require('../database/models/index');

const dbHelpers = require('../database/controllers/dbHelpers');

const { Op } = db;

//
// ─── MODULE IMPORTS ─────────────────────────────────────────────────────
//
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

//
// ─── ROUTE IMPORTS ─────────────────────────────────────────────────────
//
const views = require('./routes/views');
const profile = require('./routes/profile');
const weather = require('./routes/weather');
const news = require('./routes/news');
const stocks = require('./routes/stocks');
const traffic = require('./routes/traffic');
const particle = require('./routes/particle');
const users = require('./routes/users');
const auth = require('./routes/auth');

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
app.use(auth);
app.use(views);
app.use(weather);
app.use(news);
app.use(stocks);
app.use(traffic);
app.use(profile);
app.use(particle);
app.use(users);

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//

db.models.sequelize.sync().then(() => {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${(process.env.PORT || 3000)}!`);
  });
  const io = socket(server);
  app.set('socketio', io);

  io.on('connection', (newSocket) => {
    console.log('made socket connection', newSocket.id);
  });
});

