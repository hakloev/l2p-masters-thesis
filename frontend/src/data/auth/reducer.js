import { combineReducers } from 'redux';
import jwtDecode from 'jwt-decode';
import * as types from './actions';

const initalState = {
  login: {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
  },
  registration: {
    isRegistering: false,
    statusText: null,
  },
};

const LoginReducer = (state = initalState.login, action) => {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isAuthenticating: true,
      statusText: null,
    };
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: true,
      token: action.payload.token,
      userName: jwtDecode(action.payload.token).username,
    };
  case types.LOGIN_FAILURE:
    return {
      ...state,
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
    };
  case types.LOGOUT_REQUEST:
    return {
      ...state,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: 'You have been successfully logged out',
    };
  default:
    return state;
  }
};

const RegistrationReducer = (state = initalState.registration, action) => {
  switch (action.type) {
  case types.REGISTRATION_REQUEST:
    return {
      ...state,
      isRegistering: true,
    };
  case types.REGISTRATION_SUCCESS:
    return {
      ...state,
      isRegistering: false,
    };
  default:
    return state;
  }
};

const reducers = combineReducers({
  login: LoginReducer,
  registration: RegistrationReducer,
});

export default reducers;
