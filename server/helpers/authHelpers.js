const passport = require('passport');
const db = require('../../database/models/index');
const dbHelpers = require('../../database/controllers/dbHelpers');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

//
// ─── LOCAL STRATEGY ─────────────────────────────────────────────────────────────
//
exports.passportHelper = () => {
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, done) => {
      console.log('REQUEST', req.body);
      // Only create new user if the email hasn't been used
      db.models.User.findOne({ where: { email: username } })
        .then((foundUser) => {
          if (!foundUser) {
            dbHelpers.saveMember(username, password, req.body.zip, req.body.particleToken, (userToSave) => {
              done(null, userToSave.dataValues);
            });
          } else {
            done('error');
          }
        });
    }),
  ));

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, done) => {
      let user;
      db.models.User.findOne({ where: { email: username } })
        .then((foundUser) => {
          if (foundUser) {
            user = foundUser;
            return bcrypt.compare(password, foundUser.dataValues.password);
          } else {
            done('no such user');
          }
        })
        .then((valid) => {
          if (valid) {
            console.log('VALID PASSWORD', valid);
            done(null, user.dataValues);
          } else {
            done('wrong password', user.dataValues);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }),
  ));

  passport.serializeUser((user, done) => {
    console.log('SERIALIZE USER\n', user);
    if (user) {
      done(null, user);
    } else {
      done('invalid user');
    }
  });

  passport.deserializeUser((obj, done) => {
    console.log('DESERIALIZE USER\n');
    done(null, obj);
  });
};

exports.isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};
