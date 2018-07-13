const db = require('../models');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saveMember = (email, password, zipcode, particleToken, callback) => {
  let hashedPW;
  if (password) {
    const salt = bcrypt.genSaltSync(3);
    hashedPW = bcrypt.hashSync(password, salt);
  }
  db.models.User.create({
    email,
    password: hashedPW,
    zipcode,
    particleToken,
  })
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateMember = (email, password, zipcode, particleToken, callback) => {
  let hashedPW;
  if (password) {
    const salt = bcrypt.genSaltSync(3);
    hashedPW = bcrypt.hashSync(password, salt);
  }
  return db.models.User.findOne({
    where: { email },
  })
    .then((result) => {
      result.update({
        email,
        password: hashedPW,
        zipcode,
        particleToken,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getProfileInfo = (email, callback) => {
  return db.models.User.findOne({
    where: { email },
    raw: true,
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};

const saveProfile = (userId, profileName, widgetNames) => {
  // TODO: implement userId filtering
  console.log('DB: saving profile ', profileName);

  // delete the old profile and its associations
  db.models.Profile.findOne({
    where: {
      name: profileName,
    },
  })
    .then((profile) => {
      if (profile) {
        console.log('Deleting ', profileName);
        return profile.destroy();
      } else {
        console.log('Profile does not already exist, creating...');
      }
    })
    .then(() => {
      return db.models.Profile.findOrCreate({
        where: {
          name: profileName,
        },
      });
    })
    .then((profile) => {
      widgetNames.forEach((widgetName) => {
        db.models.Widget.findOne({
          attributes: ['id'],
          where: { name: widgetName },
        })
          .then((widget) => {
            if (widget) {
              widget.addProfile(profile[0]);
              console.log(`Successfully added widget ${widget.dataValues.id} to ${profile[0].dataValues.name}`);
            }
          });
      });
    })
    .catch((err) => {
      console.log('Error in saveProfile ', err);
    });
};

const loadUserProfiles = (userId) => {
  console.log('Loading Profiles: \n');
  return db.models.Profile.findAll({
    include: [
      {
        model: db.models.Widget,
      },
    ],
  });
};

const getUserWidgetConfigs = (userId) => {
  return db.models.UserWidgetConfig.findAll({
    where: {
      userId,
    },
    attributes: ['configuration'],
    include: [{
      model: db.models.Widget,
      attributes: ['name'],
    }],
    raw: true,
  })
    .then((configs) => {
      // console.log('USER CONFIGS RETRIEVED', configs);
      return configs;
    })
    .catch((err) => {
      // console.log('ERROR RETRIEVING CONFIGS', err);
      return err;
    });
};

const saveWeatherWidgetConfig = (userId, widgetName, zipcode) => {
  return db.models.Widget.findOne({
    where: {
      name: widgetName,
    },
  })
    .then((widget) => {
      let zip = { zipcodes: [zipcode] };
      return widget.addUser(userId, {
        through: { configuration: zip },
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
    });
};

const saveStockWidgetConfig = (userId, widgetName, stockSymbols) => {
  return db.models.Widget.findOne({
    where: {
      name: widgetName,
    },
  })
    .then((widget) => {
      let stocks = { stocks: stockSymbols };
      return widget.addUser(userId, {
        through: { configuration: stocks },
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
    });
};

const saveTrafficWidgetConfig = (userId, widgetName, trafficConfig) => {
  // TODO
};

const getUserDevices = (userId) => {
  return db.models.User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      // console.log('USER RETRIEVED', user);
      return user;
    });
};

const updateProfileWidgets = (profileName, widgetName) => {
  return db.models.Profile.findOne({
    where: {
      name: profileName,
    },
    attributes: ['id'],
    raw: true,
  })
    .then((profileId) => {
      return db.models.Widget.findOne({
        where: {
          name: widgetName,
        },
      })
        .then((widget) => {
          return widget.addProfile(profileId.id);
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  saveMember,
  updateMember,
  getProfileInfo,
  saveProfile,
  loadUserProfiles,
  saveWeatherWidgetConfig,
  saveStockWidgetConfig,
  getUserDevices,
  getUserWidgetConfigs,
  updateProfileWidgets,
};
