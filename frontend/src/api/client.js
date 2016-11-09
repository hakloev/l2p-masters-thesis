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
    console.error(`Error: ${error.message}`);
  } else {
    console.error(`Error: ${response.status} ${error.statusText}`);
  }
  return Promise.reject(error);
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
