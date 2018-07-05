require('dotenv').config();

const db = require('../database/models/index');

//
// ─── MODULE IMPORTS ─────────────────────────────────────────────────────
//
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

//
// ─── ROUTE IMPORTS ─────────────────────────────────────────────────────
//
const views = require('./routes/views');
const profile = require('./routes/profile');
const weather = require('./routes/weather');
const news = require('./routes/news');
const stocks = require('./routes/stocks');
const particle = require('./routes/particle');
const users = require('./routes/users');

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────
//
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(morgan('dev'));
app.use(session({
  secret: 'particle cat',
  resave: false,
  saveUninitialized: true,
  particleToken: '',
}));

//
// ─── ROUTE MIDDLEWARE ─────────────────────────────────────────────────────
//

app.use(views);
app.use(weather);
app.use(news);
app.use(stocks);
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

