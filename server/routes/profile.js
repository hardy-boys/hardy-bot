const express = require('express');
const dbHelpers = require('../database/controllers/dbHelpers');

const router = express.Router();

router.get('/profile/save', (req, res) => {
  // do something to save profile
  dbHelpers.saveProfile(req.body.profileName, req.body.widgetNames);
  res.status(200).send('Saved profile to db');
});

module.exports = router;
