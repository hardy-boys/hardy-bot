const express = require('express');
const dbHelpers = require('../../database/controllers/dbHelpers');

const router = express.Router();

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  dbHelpers.getUserDevices(userId)
    .then((user) => {
      console.log('USER2', user);
    });
});

module.exports = router;
