import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as actions from '../actions/auth';
import * as assignmentActions from '../actions/quiz';
import api from '../api/auth';

export function* login(action) {
  try {
    console.log('[login] requested');
    const data = yield call(api.login, action.credentials);
    yield put(actions.loginSuccess(data.token));
    yield put(assignmentActions.getAllQuizStats());
  } catch (err) {
    console.log('[login] ERROR:', err);
    yield put(actions.loginFailure(err.message));
  }
}

export function* watchLogin() {
  yield* takeEvery(actions.LOGIN_REQUEST, login);
}
