import { takeEvery, delay } from 'redux-saga';
import { call, put, take, race } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as actions from '../actions/auth';
import api from '../api/auth';

import {
  isTokenExpired,
  getTokenExpiration,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from '../common/jwt';

function* submitRegistration(action) {
  try {
    const { token } = yield call(api.register, action.payload);
    if (token) {
      yield put(actions.loginRequest({ token }));
    }
  } catch (error) {
    console.error(`${actions.REGISTRATION_FAILURE}`);
    yield put(actions.registrationFailure(error));
  }
}

export function* watchRegistration() {
  yield* takeEvery(actions.REGISTRATION_REQUEST, submitRegistration);
}

function* authorize(credentials) {
  // Authorize with token or credentials
  const response = yield call(api.authenticate, credentials);
  yield put(actions.loginSuccess(response.token));
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

export default function* loginFlow() {
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
        Materialize.toast('You have been successfully logged out', 5000);
      }

    } catch (error) {
      console.error('[loginFlow]: ', error.response || error);
      yield put(actions.loginFailure(error));
      // Reset current credentials token to ensure a wait for LOGIN_REQUEST
      credentials.token = null;
      error.response.json()
        .then(response => {
          Materialize.toast(response.non_field_errors, 5000);
        })
        .catch(e => Materialize.toast(`Unknown error: ${e.message}`, 5000));
    }
  }
}
