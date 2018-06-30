const express = require('express');
const path = require('path');

const router = express.Router();

let routeIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../react-client/dist', 'index.html'));
};

// React view routings
router.get('/dashboard', routeIndex);
router.get('/device_profiles', routeIndex);
router.get('/widgets', routeIndex);
router.get('/map', routeIndex);
router.get('/user', routeIndex);

module.exports = router;
