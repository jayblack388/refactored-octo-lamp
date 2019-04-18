import axios from 'axios';

// Gets cognito config
export const getConfig = () => {
  return axios.get('/auth/config');
};
// Register User
export const registerUser = body => {
  return axios.post('/auth/register', body);
};
// Login User
export const loginUser = body => {
  return axios.post('/auth/login', body);
};
