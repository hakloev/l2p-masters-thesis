import jwtDecode from 'jwt-decode';
import { TOKEN_IDENTIFIER } from '../common/constants';

export const isTokenExpired = token => {
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < new Date();
  }
  return false;
};

export const getTokenExpiration = token => {
  return jwtDecode(token).exp * 1000;
};

export const setAuthToken = token => {
  localStorage.setItem(TOKEN_IDENTIFIER, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_IDENTIFIER);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_IDENTIFIER);
};
