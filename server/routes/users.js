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

router.get('/users/:userId/widgets/config', (req, res) => {
  const { userId } = req.params;
  dbHelpers.getUserWidgetConfigs(userId)
    .then((configs) => {
      console.log('RETRIEVED USER CONFIGS', configs);
      res.send(configs);
    })
    .catch((err) => {
      console.log('ERROR RETRIEVING USER CONFIGS', err);
      res.send(err);
    });
});

module.exports = router;
