import * as types from '../actions/auth';
import { TOKEN_IDENTIFIER } from '../common/constants';

const initalState = {
  token: localStorage.getItem(TOKEN_IDENTIFIER),
  isLoggedIn: localStorage.getItem(TOKEN_IDENTIFIER) !== null,
  isLoginInProcess: false,
  credentials: {
    username: '',
    password: '',
  },
};

const AuthReducer = (state = initalState, action) => {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isLoginInProcess: true,
      credentials: action.credentials,
    };
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
      isLoginInProcess: false,
      credentials: {
        username: '',
        password: '',
      },
    };
  case types.LOGIN_FAILURE:
    return {
      ...state,
      token: '',
      isLoggedIn: false,
      isLoginInProcess: false,
      credentials: {
        username: '',
        password: '',
      },
    };
  case types.LOGOUT_REQUEST:
    return {
      ...state,
      token: null,
      isLoggedIn: false,
      isLoginInProcess: false,
      credentials: {
        username: '',
        password: '',
      },
    };
  default:
    return state;
  }
};

export default AuthReducer;
