export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: {
    credentials,
  },
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
