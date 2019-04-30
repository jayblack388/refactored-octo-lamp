import {
  INITIALIZE,
  INITIALIZE_CONFIG,
  CONFIG_REQUEST,
  CONFIG_SUCCESS,
  CONFIG_FAILURE
} from '../actions/types';

export const configInitialState = {
  isLoading: false,
  error: null,
  config: {
    userPoolId: null,
    userPoolWebClientId: null
  }
};

const configReducer = (state = configInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_CONFIG:
      return configInitialState;
    case CONFIG_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        isLoading: false
      };
    case CONFIG_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default configReducer;
