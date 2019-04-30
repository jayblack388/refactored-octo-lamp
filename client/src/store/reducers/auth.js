import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  INITIALIZE,
  LOGIN_SUCCESS
} from '../actions/types';

export const authInitialState = {
  isAuthenticated: false,
  authState: 'signIn'
};

const authReducer = (state = authInitialState, action) => {
  const isAuthenticated = action && action.state && action.state === 'signedIn';
  switch (action.type) {
    case INITIALIZE:
      return authInitialState;
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated,
        authState: action.state
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authState: 'signedIn'
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated,
        authState: ''
      };
    default:
      return state;
  }
};

export default authReducer;
