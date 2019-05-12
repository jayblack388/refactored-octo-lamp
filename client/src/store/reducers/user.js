import axios from 'axios';
import {
  INITIALIZE,
  INITIALIZE_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/types';

export const userInitialState = {
  isLoading: false,
  error: null,
  user: {
    tokens: {
      accessToken: {
        jwtToken: null,
      },
      idToken: {
        jwtToken: null,
      },
      refreshToken: {
        token: null,
      },
    },
    details: {
      email: null,
    },
  },
};

const mapData = (current = userInitialState.user, res) => {
  const email = res && res.email;
  const accessToken = res && res.accessToken;
  const idToken = res && res.idToken;
  const refreshToken = res && res.token;
  // Adding Tokens
  const tokens = {
    ...current.tokens,
  };
  if (accessToken) tokens.accessToken.jwtToken = accessToken;
  if (idToken) tokens.idToken.jwtToken = idToken;
  if (refreshToken) tokens.refreshToken.token = refreshToken;
  // Adding Details
  const details = {
    ...current.details,
  };
  if (email) details.email = email;
  // Spreading in tokens and details
  const response = {
    ...current,
    tokens,
    details,
  };

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
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: mapData(action.user, state.user),
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const login = (dispatch, data) => {
  const url = `/auth/login`;
  dispatch(loginRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(resp => {
      const data = resp && resp.data;
      console.log(resp, data);
      dispatch(loginSuccess(data));
    })
    .catch(e => {
      dispatch(loginFailure(e));
    });
};


export default userReducer;
