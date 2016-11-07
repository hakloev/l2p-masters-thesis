import { TOKEN_IDENTIFIER } from '../common/constants';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(`${response.status}: ${response.statusText}`);
    error.response = response;
    return Promise.reject(error);
  }
  return response;
}

export function errorHandle(error) {
  const response = error.response;
  if (response === undefined) {
    console.info('[errorHandle] undefined response, returning the error itself');
    return Promise.reject({ error }); // Return statusText
  }

  return Promise.reject({
    message: response.statusText,
    status: response.status,
    error,
  });
}

const methods = ['post', 'get'];

class ApiService {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, { body } = {}) => {
        const token = localStorage.getItem(TOKEN_IDENTIFIER);
        // eslint-disable-next-line
        let requestInit = {
          method,
          cache: 'default',
        };

        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        if (token) {
          headers.Authorization = `JWT ${token}`;
        }

        if (body) {
          requestInit.body = JSON.stringify(body);
        }

        requestInit.headers = headers;
        const request = new Request(path);

        return fetch(request, requestInit)
          .then(checkStatus)
          .then(response => response.json())
          .catch(errorHandle);
      };
    });
  }
}

export default new ApiService();
