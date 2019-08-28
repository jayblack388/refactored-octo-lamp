import authReducer from './auth';
import configReducer from './config';
import fileReducer from './file';
import userReducer from './user';
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  file: fileReducer,
  user: userReducer,
});

export { authInitialState as auth } from './auth';
export { configInitialState as config } from './config';
export { fileInitialState as file } from './file';
export { userInitialState as user } from './user';

export default rootReducer;
