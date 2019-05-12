import React, { useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

import { useGlobalState } from '../../store/GlobalState';
import * as actions from '../../store/actions/types';
import { getUserData } from '../../utils/API';
import { configureAuth } from '../../store/reducers/config';
import { authSuccess } from '../../store/reducers/auth';
import { login } from '../../store/reducers/user';
import { Loader } from '../common';

const mapUser = async cognitoUser => {
  const { attributes, signInUserSession } = cognitoUser;
  const { email } = attributes;
  const {
    refreshToken: { token: refreshToken },
    idToken: { jwtToken: idToken },
    accessToken: { jwtToken: accessToken },
  } = signInUserSession;
  const response = await getUserData(email);
  const user = {
    details: {
      email,
      ...response.data,
    },
    tokens: {
      accessToken,
      idToken,
      refreshToken,
    },
  };
  return user;
};

const CustomAuthenticator = props => {
  const { children } = props;

  const [store, dispatch] = useGlobalState();
  const {
    auth: { isAuthenticated },
    config,
    user: {
      user: {
        details: { email },
      },
    },
  } = store;
  const {
    isLoading: configIsLoading,
    config: { userPoolId, userPoolWebClientId },
  } = config;
  // const getErrorMessage = err => (typeof err === 'string' ? err : err.message);

  const setIsAuthenticated = state => {
    return dispatch(authSuccess(state));
  };

  // const onLogin = (username, password) => {
  //   dispatch({ type: actions.LOGIN_REQUEST });
  //   const response = Auth.signIn(username, password)
  //     .then(async cognitoUser => {
  //       const user = await mapUser(cognitoUser);
  //       console.log('user :::', user);
  //       dispatch({
  //         type: actions.LOGIN_SUCCESS,
  //         user,
  //       });
  //     })
  //     .catch(err => {
  //       dispatch({
  //         type: actions.LOGIN_FAILURE,
  //         error: err,
  //       });
  //       console.log('auth.error :::', err);
  //       if (err.code === 'UserNotConfirmedException') {
  //         Auth.resendSignUp(username).then(() => {
  //           console.log('code resent successfully');
  //           const error = { code: err.code, message: err.message };
  //           return { error };
  //         });
  //       }
  //       const error = err.code
  //         ? { code: err.code, message: err.message }
  //         : { message: getErrorMessage(err) };
  //       return { error };
  //     });

  //   return response;
  // };
  const onLogin = (email, password) => {
    login(dispatch, { email, password });
  };

  // const onSignUp = (username, password, attributes) => {
  //   const response = Auth.signUp({
  //     username,
  //     password,
  //     attributes,
  //     validationData: [] // optional
  //   })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       const error = this.getErrorMessage(err);
  //       return { error };
  //     });

  //   return response;
  // };

  const onLogout = () => {
    const currentUser = Auth.userPool.getCurrentUser();
    currentUser.signOut();
    dispatch({
      type: actions.INITIALIZE,
    });
  };

  useEffect(() => {
    if (!email && isAuthenticated) {
      dispatch({ type: actions.LOGIN_REQUEST });
      Auth.currentAuthenticatedUser({
        bypassCache: true,
      })
        .then(async cognitoUser => {
          const user = await mapUser(cognitoUser);
          console.log('user :::', user);
          dispatch({
            type: actions.LOGIN_SUCCESS,
            user,
          });
        })
        .catch(err =>
          dispatch({
            type: actions.LOGIN_FAILURE,
            error: err,
          })
        );
    }
  }, [isAuthenticated, email]);

  useEffect(() => {
    if (config && !(userPoolId && userPoolWebClientId)) {
      configureAuth(dispatch);
    }
  }, []);
  !configIsLoading &&
    Amplify.configure({
      Auth: {
        region: 'us-east-1',
        userPoolId,
        userPoolWebClientId,
        mandatorySignIn: false,
        authenticationFlowType: 'USER_SRP_AUTH',
      },
    });
  return (
    <Loader isLoading={configIsLoading}>
      <Authenticator
        onStateChange={state => {
          console.log('authState change ::: ', state);
          if (state === 'signedIn') {
            setIsAuthenticated(state);
          }
        }}
        hideDefault
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            onLogin,
            // onSignUp,
            onLogout,
          });
        })}
      </Authenticator>
    </Loader>
  );
};

export default CustomAuthenticator;
