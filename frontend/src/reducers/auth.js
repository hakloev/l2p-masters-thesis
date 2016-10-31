import jwtDecode from 'jwt-decode';
import * as types from '../actions/auth';

const initalState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

const AuthReducer = (state = initalState, action) => {
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

export default AuthReducer;
