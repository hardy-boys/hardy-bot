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
      res.status(500).end(err);
    });
});

router.post('/updateProfile', (req, res) => {
  if (req.user) {
    dbHelpers.updateMember(req.user.email, req.body.password, req.body.zip, req.body.particleToken)
      .then((user) => {
        console.log(req.body);
      });
    console.log('UPDATE PROFILE.');
  }
});

router.get('/profileInfo', (req, res) => {
  if (req.user) {
    dbHelpers.getProfileInfo(req.user.email)
      .then((user) => {
        console.log('PROFILE INFORMATIONNNNNN.', user);
        res.send(user);
      });
  }
});

module.exports = router;
