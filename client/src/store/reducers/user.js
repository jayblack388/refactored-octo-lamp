import {
  INITIALIZE,
  INITIALIZE_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions/types';

export const userInitialState = {
  isLoading: false,
  error: null,
  user: {
    email: null,
    tokens: {
      accessToken: {
        jwtToken: null
      },
      idToken: {
        jwtToken: null
      },
      refreshToken: {
        token: null
      }
    }
  }
};

const mapData = (current = userInitialState.user, res) => {
  const email = res && res.email;
  const accessToken = res && res.accessToken;
  const idToken = res && res.idToken;
  const refreshToken = res && res.token;
  const tokens = {
    ...current.tokens
  };
  if (accessToken) tokens.accessToken.jwtToken = accessToken;
  if (idToken) tokens.idToken.jwtToken = idToken;
  if (refreshToken) tokens.refreshToken.token = refreshToken;
  const response = {
    ...current,
    tokens
  };
  if (email) response.email = email;

  return response;
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_USER:
      return userInitialState;
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: mapData(action.user, state.user)
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default userReducer;
