const express = require('express');
const path = require('path');

const router = express.Router();

let routeIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../react-client/dist', 'index.html'));
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).redirect('/login');
};

// React view routings
router.get('/', isLoggedIn, routeIndex);
router.get('/dashboard', isLoggedIn, routeIndex);
router.get('/device_profiles', isLoggedIn, routeIndex);
router.get('/widgets', isLoggedIn, routeIndex);
router.get('/map', isLoggedIn, routeIndex);
router.get('/user', isLoggedIn, routeIndex);
router.get('/login', routeIndex);
router.get('/signup', routeIndex);

module.exports = router;
