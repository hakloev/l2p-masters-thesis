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
  if (response.status === 400) {
    return Promise.reject({ message: 'Invalid credentials', status: response.status, statusText: response.statusText });
  }
  return Promise.reject({
    message: response.statusText,
    status: response.status,
  });
}

class SessionApi {
  static login(credentials) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    };

    return fetch('/auth/token/', options)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => response)
      .catch(errorHandle);
  }
}

export default SessionApi;
