require('es6-promise').polyfill();
require('isomorphic-fetch');

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
  return response;
}

export function errorHandle(error) {
  const response = error.response;
  if (response === undefined) {
    console.log('[errorHandle] undefined response, returning the error itself');
    return Promise.reject(error); // Return statusText
  }
  return Promise.reject(error);
}

const defaultOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const refreshToken = token => {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({
      token,
    }),
  };

  return fetch('/auth/token/refresh/', options)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response)
    .catch(errorHandle);
};

const authenticate = ({ token, username, password }) => {
  if (token) {
    return refreshToken(token);
  }

  const options = {
    ...defaultOptions,
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return fetch('/auth/token/', options)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response)
    .catch(errorHandle);
};

export default {
  authenticate: credentials => authenticate(credentials),
};
