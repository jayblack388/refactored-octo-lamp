const router = require('express').Router();
const cognito = require('../cognito');

router
  .route('/register')
  .post(cognito.RegisterUser)
router
  .route('/login')
  .post(function(req, res) {
    if (req.body && req.body.code) {
      cognito.ConfirmUser(req, res);
    } else {
      cognito.Login(req, res);
    }
  })

module.exports = router;
