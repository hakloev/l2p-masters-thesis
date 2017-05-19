import { takeEvery, delay } from 'redux-saga';
import { call, put, take, race } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import ReactGA from 'react-ga';
import jwtDecode from 'jwt-decode';

import * as actions from './actions';
import api from '../../api/auth';

import {
  isTokenExpired,
  getTokenExpiration,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from '../../common/jwt';

function* submitRegistration(action) {
  try {
    const { token } = yield call(api.register, action.payload);
    if (token) {
      yield put(actions.loginRequest({ token }));
    }
  } catch (error) {
    console.error(`${actions.REGISTRATION_FAILURE}: ${error.message}`);
    yield put(actions.registrationFailure(error.message));
    if (error.json.username) {
      toastr.info('Invalid', 'A user with that username already exists', { timeOut: 5000 });
    } else {
      toastr.error('Error', 'Something went wrong during the registration, please try again later!', { timeOut: 5000 });
    }
  }
}

export function* watchRegistration() {
  yield* takeEvery(actions.REGISTRATION_REQUEST, submitRegistration);
}

function* authorize(credentials) {
  // Authorize with token or credentials
  const response = yield call(api.authenticate, credentials);
  yield put(actions.loginSuccess(response.token));
  ReactGA.set({ userId: jwtDecode(response.token).user_id });
  return response.token;
}

function* authenticateAndRefreshOnExpiry(tokenOrCredentials) {
  // Initial authentication, either with token or credentials
  let token = yield call(authorize, tokenOrCredentials);
  yield call(setAuthToken, token);
  browserHistory.push('/start');

  // Refresh token at each expiery
  while (true) {
    const tokenExpiresIn = getTokenExpiration(token) - new Date();
    yield call(delay, tokenExpiresIn); // Await the expiration time
    token = yield call(authorize, { token }); // Authorize with the new token
    yield call(setAuthToken, token); // Update localStorage
    console.info('Refreshed the authentication token');
  }
}

export function* loginFlow() {
  let storedToken = yield call(getAuthToken);

  if (isTokenExpired(storedToken)) {
    console.warn('The current authentication token has expired!');
    storedToken = null;
    yield call(removeAuthToken);
  }

  let credentials = { token: storedToken };

  // eslint-disable-next-line
  while (true) {
    try {
      // If we do not have a previous token, we await a login-request
      if (!credentials.token) {
        console.info(`No token found in localStorage, awaiting ${actions.LOGIN_REQUEST}`);
        const { payload } = yield take(actions.LOGIN_REQUEST);
        credentials = { ...credentials, ...payload };
      }

      // Race condition between logout and refreshing token
      const { logout } = yield race({
        logout: take(actions.LOGOUT_REQUEST),
        authLoop: call(authenticateAndRefreshOnExpiry, credentials),
      });

      if (logout) {
        credentials.token = null;
        yield call(removeAuthToken);
        browserHistory.push('/login');
        toastr.success('Success', 'You have been successfully signed out', { timeOut: 4000 });
      }

    } catch ({ json, message }) {
      console.error('[loginFlow]: ', message);
      yield put(actions.loginFailure(message));
      yield call(removeAuthToken);
      credentials.token = null;
      // Reset current credentials token to ensure a wait for LOGIN_REQUEST

      browserHistory.push('/login');

      if (json.non_field_errors) {
        console.error('Maybe invalid token? ', json.non_field_errors);
        toastr.error('Error', json.non_field_errors[0]);
      } else {
        console.error(`Unknown error occured: ${message}`);
      }
    }
  }
}
