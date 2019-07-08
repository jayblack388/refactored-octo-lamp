require('dotenv').config();
const cognito = require('../keys').cognito;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const { User } = require('../models');

const poolData = {
  UserPoolId: cognito.poolId, // Your user pool id here
  ClientId: cognito.clientId, // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser(req, res) {
  const { email, password, name } = req.body;
  const attributeList = [];
  userPool.signUp(email, password, attributeList, null, function(err, result) {
    if (err) {
      res.status(403).json(err);
    }
    const confirmed = result.userConfirmed;
    User.create({ email, name })
      .then(dbUser => {
        res.status(200).json({
          confirmed,
          details: dbUser,
        });
      })
      .catch(err => res.status(403).json(err));
  });
}
function ConfirmUser(req, res) {
  const { email, code } = req.body;
  var userData = {
    Username: email,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (
      result === 'SUCCESS' ||
      (err &&
        err.code === 'NotAuthorizedException' &&
        err.message === 'User cannot be confirm. Current status is CONFIRMED')
    ) {
      Login(req, res);
    } else {
      res.status(403).json(err);
    }
  });
}

function Login(req, res) {
  const { email, password } = req.body;
  console.log(email);
  console.log(userPool);
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password,
  });

  var userData = {
    Username: email,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(tokens) {
      User.findOne({ email }).then(dbUser => {
        const {
          refreshToken: { token: refreshToken },
          idToken: { jwtToken: idToken },
          accessToken: { jwtToken: accessToken },
        } = tokens;
        res.status(200).json({
          details: dbUser,
          tokens: { refreshToken, idToken, accessToken },
        });
      });
    },
    onFailure: function(err) {
      res.status(403).json(err);
    },
  });
}

function Logout(req, res) {
  const { email } = req.body;
  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.signOut(/* {
    onSuccess: function() {
      res.json({});
    },
    onFailure: function(err) {
      res.status(500).send(err);
    },
  } */);
  res.json({});
}
// function ChangePassword(username, password, newpassword) {
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: username,
//     Password: password
//   });

//   var userData = {
//     Username: username,
//     Pool: userPool
//   };
//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.authenticateUser(authenticationDetails, {
//     onSuccess: function(result) {
//       cognitoUser.changePassword(password, newpassword, (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('Successfully changed password of the user.');
//           console.log(result);
//         }
//       });
//     },
//     onFailure: function(err) {
//       console.log(err);
//     }
//   });
// }

function Renew(req, res) {
  const { email, refreshToken } = req.body;
  const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: refreshToken,
  });

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.refreshSession(RefreshToken, (err, session) => {
    if (err) {
      console.log(err);
    } else {
      const tokens = {
        accessToken: session.accessToken.jwtToken,
        idToken: session.idToken.jwtToken,
        refreshToken: session.refreshToken.token,
      };
      User.findOne({ email }).then(dbUser => {
        res.status(200).json({
          details: dbUser,
          tokens,
        });
      });
    }
  });
}

module.exports = { Login, ConfirmUser, RegisterUser, Logout, Renew };
