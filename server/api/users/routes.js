var router = require('express').Router();
var User = require('./model');
var bcrypt = require('bcrypt');
var session = require('client-sessions');
var passport = require('passport');

router.post('/create', (req, res) => {
  var user = req.body;
  if (user.email && user.password) {
    bcrypt.hash(user.password, 8, (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        user.password = hash;
        User.create(user)
          .then(user => {
            delete user.password;
            res.status(200).json(user);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    });

  }

});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(user);
    }
  });
});

// U //
router.post('/:id/update', requireLogin, (req, res) => {
  var user = req.body;
  if (user.password) {
    bcrypt.hash(user.password, 8, (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        user.password = hash;
        User.update({ _id: req.params.id }, { $set: user }, (err, user) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(user);
          }
        });
      }
    });
  } else {
    User.update({ _id: req.params.id }, { $set: user }, (err, user) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(user);
      }
    });
  }
});

// D //
router.delete('/:id/delete', requireLogin, (req, res) => {
  User.remove({ _id: req.params.id }, err => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ status: 'success' });
  });
});

// login //
router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(result => {
            if (result) {
              user.password = undefined;
              req.session.user = user;
              res.status(200).json(user);
              //console.log(req.session);
            } else
              res
                .status(404)
                .json({ status: 'email/password combo not found' });
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ status: 'email/password combo not found' });
      }
    }
  });
});

router.post('/logout', (req, res) => {
  //console.log('this is sesson', req.session.user);
  //console.log('this is req.user', req.user);
  req.session.reset();

  res.status(200).json('you have logged out');
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.session && req.session.user) return next();
  // if they aren't redirect them to the home page
  res.status(404).json({ status: 'Your are not logged in.' });
}

function requireLogin(req, res, next) {
  if (!req.user) {
    console.log(req.user);
    res.status(404).json({ status: 'Your are not logged in.' });
  } else {
    next();
  }
}

module.exports = router;
