const db = require('../models');
const sequelize = require('sequelize');

const saveProfile = (profileName, widgetNames) => {
  db.models.Profile.findOrCreate({
    where: {
      name: profileName,
    },
  })
  // db.models.Profile.create({
  //   name: profileName,
  // })
    .then((profile) => {
      widgetNames.forEach((widgetName) => {
        db.models.Widget.findOne({
          attributes: ['id'],
          where: { name: widgetName },
        })
          .then((widget) => {
            widget.addProfile(profile[0]);
          });
      });
    });
};

module.exports = {
  saveProfile,
};
