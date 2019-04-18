require('dotenv').config();
const cognitoKeys = require('../keys').cognito;
const router = require('express').Router();
const cognito = require('../cognito');

router.route('/config').get(function(req, res) {
  res.status(200).json({
    userPoolId: cognitoKeys.poolId,
    userPoolWebClientId: cognitoKeys.clientId
  });
});

router.route('/register').post(cognito.RegisterUser);
router.route('/login').post(function(req, res) {
  if (req.body && req.body.code) {
    cognito.ConfirmUser(req, res);
  } else {
    cognito.Login(req, res);
  }
});

module.exports = router;
