import apiService from './client';

const refreshToken = token => {
  return apiService.post('/auth/token/refresh/', { body: { token } });
};

const authenticate = ({ token, username, password }) => {
  if (token) {
    return refreshToken(token);
  }

  return apiService.post('/auth/token/', { body: { username, password } });
};

export default {
  authenticate: credentials => authenticate(credentials),
};
