require('dotenv').config();

const db = require('../database/models/index');

const auth = require('../lib/auth');
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
const session = require('express-session');
const passport = require('passport');
const flash = require('flash');


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

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────
//
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(morgan('dev'));
app.use(session({
  secret: 'cat keyboat',
  resave: false,
  saveUninitialized: true,
  particleToken: '',
}));

//
// ─── LOCAL AUTH MIDDLEWARE ─────────────────────────────────────────────────────
//
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
auth.passportHelper(passport);
app.use(flash());

//
// ─── LOCAL AUTH ENDPOINTS ───────────────────────────────────────────────────────
//
app.get('/checklogin', (req, res) => {
  res.status(200).send(req.session.passport);
});

app.post('/subscribe', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureFlash: true,
}), (req, res) => {
  res.status(200).redirect('/');
});

app.post('/loginEnter', passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/widgets',
  successFlash: 'Welcome!',
  failureFlash: 'Invaid Username or Password.',
}), (req, res) => {
  console.log('user', req.user);
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//
// ─── ROUTE MIDDLEWARE ─────────────────────────────────────────────────────
//

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

