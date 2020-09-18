const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const cors = require('./cors');
const authenticate = require('../authenticate');
const validateSignUpInput = require("../validators/register");
const validateLoginInput = require("../validators/login");

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, (req,res,next) => {
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// router.post('/signup', cors.corsWithOptions, (req, res, next) => {
//   User.register(new User({username: req.body.username}), 
//     req.body.password, (err, user) => {
//     if(err) {
//       res.statusCode = 500;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({err: err});
//     }
//     else {
//       user.save((err, user) => {
//         if (err) {
//           res.statusCode = 500;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({err: err});
//           return ;
//         }
//         passport.authenticate('local')(req, res, () => {
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({success: true, status: 'Registration Successful!'});
//         });
//       });
//     }
//   });
// });

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  const {errors, isValid} = validateSignUpInput(req.body);
  const {username, email, password} = req.body;
  if (!isValid) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json(errors);
  }
    User.register(new User({username, email}), password, (err, user) => {
      // if(err) {
      //   res.statusCode = 500;
      //   res.setHeader('Content-Type', 'application/json');
      //   res.json({err: err});
      // }
      console.log(user)
      // user.email = req.body.email;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
        }

        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    });
});


router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password } = req.body;
  User.findOne({username}).then(user => {
    if (!user) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json('Email not found');
    }
  })
  const token = authenticate.getToken({_id: req.user._id});
  if (token === null) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.json('Incorrect password');
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

router.get('/logout', cors.corsWithOptions, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
