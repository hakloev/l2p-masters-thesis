export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';

export const REGISTRATION_REQUEST = 'auth/REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'auth/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'auth/REGISTRATION_FAILURE';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: {
    ...credentials,
  },
});

export const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error,
    },
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

/* REGISTRATION */
export const registrationRequest = data => ({
  type: REGISTRATION_REQUEST,
  payload: {
    ...data,
  },
});

export const registrationSuccess = token => ({
  type: REGISTRATION_SUCCESS,
  payload: {
    token,
  },
});

export const registrationFailure = error => {
  return {
    type: REGISTRATION_FAILURE,
    payload: {
      error,
    },
  };
};
