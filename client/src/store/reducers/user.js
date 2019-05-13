import axios from 'axios';
import {
  INITIALIZE,
  INITIALIZE_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/types';

export const userInitialState = {
  isLoading: false,
  error: null,
  user: {
    tokens: {
      accessToken: null,

      idToken: null,

      refreshToken: null,
    },
    details: {
      email: null,
    },
  },
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_USER:
    case LOGOUT_SUCCESS:
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
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_FAILURE:
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

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = user => ({
  type: LOGOUT_SUCCESS,
  user,
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
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
      const { data } = resp;
      const { details, tokens } = data;
      const { email } = details;
      const { accessToken, refreshToken, idToken } = tokens;
      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('idToken', idToken);
      dispatch(loginSuccess(data));
    })
    .catch(e => {
      dispatch(loginFailure(e));
    });
};

export const refreshLogin = (dispatch, data) => {
  const url = `/auth/renew`;
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
      const { data } = resp;
      dispatch(loginSuccess(data));
    })
    .catch(e => {
      dispatch(loginFailure(e));
    });
};

export const logout = (dispatch, data) => {
  const url = `/auth/logout`;
  dispatch(logoutRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
  })
    .then(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('idToken');
      dispatch(logoutSuccess());
    })
    .catch(e => {
      dispatch(logoutFailure(e));
    });
};

export default userReducer;
