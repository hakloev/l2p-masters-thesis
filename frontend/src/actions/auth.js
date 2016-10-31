export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: {
    credentials,
  },
});

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
};

export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
