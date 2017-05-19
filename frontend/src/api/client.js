import 'isomorphic-fetch';
import promise from 'es6-promise';
import { TOKEN_IDENTIFIER } from '../common/constants';

promise.polyfill();

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
          .then(response => response.json()
            .then(json => ({ json, response }))
            .then(({ json, response }) => {
              if (!response.ok) {
                const message = `Error: ${response.status} ${response.statusText}`;
                return Promise.reject(({ json, message }));
              }
              return json;
            })
        );
      };
    });
  }
}

export default new ApiService();
