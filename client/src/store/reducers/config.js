import axios from 'axios';
import {
  INITIALIZE,
  INITIALIZE_CONFIG,
  CONFIG_REQUEST,
  CONFIG_SUCCESS,
  CONFIG_FAILURE,
} from '../actions/types';

export const configInitialState = {
  isLoading: false,
  error: null,
  config: {
    userPoolId: null,
    userPoolWebClientId: null,
  },
};

const configReducer = (state = configInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_CONFIG:
      return configInitialState;
    case CONFIG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        isLoading: false,
      };
    case CONFIG_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

const configRequest = () => ({
  type: CONFIG_REQUEST,
});

const configSuccess = config => ({
  type: CONFIG_SUCCESS,
  config,
});

const configFailure = error => ({
  type: CONFIG_FAILURE,
  error,
});

export const initConfig = () => ({
  type: INITIALIZE_CONFIG,
});

export const configureAuth = dispatch => {
  const url = `/auth/config`;
  dispatch(configRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
  })
    .then(({ data }) => {
      console.log(data);
      dispatch(configSuccess(data));
    })
    .catch(e => {
      dispatch(configFailure(e));
    });
};

export default configReducer;
