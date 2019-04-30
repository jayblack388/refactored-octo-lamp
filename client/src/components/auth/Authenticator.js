import React, { useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

import { useGlobalState } from '../../store/GlobalState';
import * as actions from '../store/actions/types';
import { getConfig } from '../../utils/API';
import { Loader } from '../common';

const CustomAuthenticator = props => {
  const { children } = props;

  const [store, dispatch] = useGlobalState();
  const {
    auth: { isAuthenticated },
    config,
    user: {
      user: { email }
    }
  } = store;
  const {
    isLoading: configIsLoading,
    config: { userPoolId, userPoolWebClientId }
  } = config;
  const getErrorMessage = err => (typeof err === 'string' ? err : err.message);

  const setIsAuthenticated = state => {
    return dispatch({ type: actions.AUTH_SUCCESS, state });
  };

  const configRequest = () => {
    dispatch({ type: actions.CONFIG_REQUEST });
    getConfig()
      .then(({ data }) => {
        return dispatch({ type: actions.CONFIG_SUCCESS, config: data });
      })
      .catch(err => {
        return dispatch({ type: actions.CONFIG_FAILURE, error: err });
      });
  };

  const mapUser = cognitoUser => {
    const { attributes, signInUserSession } = cognitoUser;
    const { email } = attributes;
    const {
      refreshToken: { token: refreshToken },
      idToken: { jwtToken: idToken },
      accessToken: { jwtToken: accessToken }
    } = signInUserSession;
    const user = {
      email,
      tokens: {
        accessToken,
        idToken,
        refreshToken
      }
    };
    return user;
  };

  const onLogin = (username, password) => {
    dispatch({ type: actions.LOGIN_REQUEST });
    const response = Auth.signIn(username, password)
      .then(cognitoUser => {
        const user = mapUser(cognitoUser);
        console.log('user :::', user);
        dispatch({
          type: actions.LOGIN_SUCCESS,
          user
        });
      })
      .catch(err => {
        dispatch({
          type: actions.LOGIN_FAILURE,
          error: err
        });
        console.log('auth.error :::', err);
        if (err.code === 'UserNotConfirmedException') {
          Auth.resendSignUp(username).then(() => {
            console.log('code resent successfully');
            const error = { code: err.code, message: err.message };
            return { error };
          });
        }
        const error = err.code
          ? { code: err.code, message: err.message }
          : { message: getErrorMessage(err) };
        return { error };
      });

    return response;
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
      type: actions.INITIALIZE
    });
  };

  useEffect(() => {
    if (!email && isAuthenticated) {
      dispatch({ type: actions.LOGIN_REQUEST });
      Auth.currentAuthenticatedUser({
        bypassCache: true
      })
        .then(cognitoUser => {
          const user = mapUser(cognitoUser);
          console.log('user :::', user);
          dispatch({
            type: actions.LOGIN_SUCCESS,
            user
          });
        })
        .catch(err =>
          dispatch({
            type: actions.LOGIN_FAILURE,
            error: err
          })
        );
    }
  }, [isAuthenticated, email]);

  useEffect(() => {
    if (config && !(userPoolId && userPoolWebClientId)) {
      configRequest();
    }
  }, []);
  !configIsLoading &&
    Amplify.configure({
      Auth: {
        region: 'us-east-1',
        userPoolId,
        userPoolWebClientId,
        mandatorySignIn: false,
        authenticationFlowType: 'USER_SRP_AUTH'
      }
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
            onLogout
          });
        })}
      </Authenticator>
    </Loader>
  );
};

export default CustomAuthenticator;
