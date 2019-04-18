require('dotenv').config();
const cognito = require('../keys').cognito;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
// const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: cognito.poolId, // Your user pool id here
  ClientId: cognito.clientId // Your client id here
};
const pool_region = 'us-east-1';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function ValidateToken(token) {
  request(
    {
      url: `https://cognito-idp.${pool_region}.amazonaws.com/${
        poolData.UserPoolId
      }/.well-known/jwks.json`,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body['keys'];
        for (var i = 0; i < keys.length; i++) {
          //Convert each key to PEM
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        //validate the token
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          console.log('Not a valid JWT token');
          return;
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log('Invalid token');
          return;
        }

        jwt.verify(token, pem, function(err, payload) {
          if (err) {
            console.log('Invalid Token.');
          } else {
            // console.log('Valid Token.');
            // console.log(payload);
            console.log('should return true');
            return true;
          }
        });
      } else {
        console.log('Error! Unable to download JWKs');
      }
    }
  );
}

function RegisterUser(req, res) {
  const { email, password } = req.body;
  var attributeList = [];
  userPool.signUp(email, password, attributeList, null, function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    res.json(cognitoUser);
  });
}
function ConfirmUser(req, res) {
  const { email, code } = req.body;
  var userData = {
    Username: email,
    Pool: userPool
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
    }
    if (err) {
      console.log('error: ', err);
    }
  });
}

function Login(req, res) {
  const { email, password } = req.body;
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  });

  var userData = {
    Username: email,
    Pool: userPool
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      console.log('id token + ' + result.getIdToken().getJwtToken());
      console.log('refresh token + ' + result.getRefreshToken().getToken());
      res.json(result);
    },
    onFailure: function(err) {
      console.log(err);
    }
  });
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

// function Renew() {
//   const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
//     RefreshToken: 'your_refresh_token_from_a_previous_login'
//   });

//   const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//   const userData = {
//     Username: 'sample@gmail.com',
//     Pool: userPool
//   };

//   const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.refreshSession(RefreshToken, (err, session) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let retObj = {
//         access_token: session.accessToken.jwtToken,
//         id_token: session.idToken.jwtToken,
//         refresh_token: session.refreshToken.token
//       };
//       console.log(retObj);
//     }
//   });
// }

module.exports = { Login, ConfirmUser, RegisterUser, ValidateToken };
