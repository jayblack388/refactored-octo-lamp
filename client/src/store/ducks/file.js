import axios from 'axios';
import { INITIALIZE } from './auth';
export const INITIALIZE_FILE = 'INITIALIZE_FILE';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const fileInitialState = {
  isLoading: false,
  err: null,
  file: {},
};

const fileReducer = (state = fileInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_FILE:
      return fileInitialState;
    case UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.err,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        file: action.data,
      };
    default:
      return state;
  }
};

export const uploadRequest = () => ({
  type: UPLOAD_REQUEST,
});
export const uploadSuccess = data => ({
  type: UPLOAD_SUCCESS,
  data,
});
export const uploadFailure = err => ({
  type: UPLOAD_FAILURE,
  err,
});

export const uploadFile = (dispatch, user, data) => {
  const {
    tokens: { accessToken: accesstoken },
    details: { _id: userId },
  } = user;
  const url = `/api/user/${userId}/files`;
  dispatch(uploadRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
      accesstoken,
    },
    method: 'post',
    data,
  })
    .then(resp => {
      const { data } = resp;
      dispatch(uploadSuccess(data));
    })
    .catch(({ response: { data: e } }) => {
      dispatch(uploadFailure(e));
    });
};

export default fileReducer;
