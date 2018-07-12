const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('flash');
const auth = require('../helpers/authHelpers');

const router = express.Router();

//
// ─── LOCAL AUTH MIDDLEWARE ─────────────────────────────────────────────────────
//
router.use(session({
  secret: 'keyboat cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
}));
router.use(passport.initialize());
router.use(passport.session());
auth.passportHelper(passport);
router.use(flash());

router.use((req, res, next) => {
  console.log(req.session);
  next();
});

//
// ─── LOCAL AUTH ENDPOINTS ───────────────────────────────────────────────────────
//
router.get('/checklogin', (req, res) => {
  res.status(200).send(req.session.passport);
});

router.post('/subscribe', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureFlash: true,
}), (req, res) => {
  res.status(200).redirect('/');
});

// router.post('/loginEnter', passport.authenticate('local-login', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
//   successFlash: 'Welcome!',
//   failureFlash: 'Invaid Username or Password.',
// }), (req, res) => {
//   console.log('user', req.user);
//   if (req.user) {
//     res.status(200).send('login successful');
//   } else {
//     res.status(500).send('login failed');
//   }
//   res.redirect('/dashboard');
// });

router.post('/loginEnter', (req, res) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      console.log(err); // will generate a 500 error
    }
    if (!user) {
      res.status(409).send({ login: 'user not found' });
    }
    req.login(user, (error) => {
      if (error) {
        console.log('login:', error);
        res.status(401).send({ login: 'failed' });
      } else {
        res.status(200).send({ login: 'success' });
      }
    });
  })(req, res);
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
