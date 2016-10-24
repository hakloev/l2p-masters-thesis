import { browserHistory } from 'react-router';
import { TOKEN_IDENTIFIER } from '../common/constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  credentials,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = token => {
  console.log('loginSuccess');
  localStorage.setItem(TOKEN_IDENTIFIER, token);
  browserHistory.push('/start');
  return {
    type: LOGIN_SUCCESS,
    token,
  };
};

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = message => {
  localStorage.removeItem(TOKEN_IDENTIFIER);
  return {
    type: LOGIN_FAILURE,
    message,
  };
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logoutRequest = () => {
  localStorage.removeItem(TOKEN_IDENTIFIER);
  browserHistory.push('/login');
  return {
    type: LOGOUT_REQUEST,
  };
};

// TODO: Create logout functionality
