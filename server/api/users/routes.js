var router = require('express').Router();
var User = require('./model');
var bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/create', (req, res) => {
  var user = req.body;
  console.log(req.body);
  bcrypt.hash(user.password, 8, (err, hash) => {
    if (err) {
      res.status(500).json(err);
    }
    user.password = hash;
    User.create(user)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
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
router.post('/:id/update', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  User.remove({ _id: req.params.id }, err => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ status: 'success' });
  });
});

// login //
router.post('/login', (req, res) => {
  console.log('sessions:', req.session);
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password);
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(result => {
            console.log(user.password);
            if (result) {
              req.session.user = user;
              res.status(200).json(user);
              console.log(req.session);
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
  console.log('seesion before log out', req.session);

  req.session.reset();
  req.logout();
  console.log('seesion after logging out', req.session);

  res.status(200).json('you have logged out');
});
//  router.post('/login', (req, res, next) => {
// passport.authenticate('local', {
//   successRedirect: res.status(200).json({ status: 'success' }),
//   failureRedirect:res
//   .status(404)
//   .json({ status: 'email/password combo not found' }),
//   failureFlash: true
// })(req,res,next);
// });

module.exports = router;
