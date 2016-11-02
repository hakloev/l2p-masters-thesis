import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as actions from '../actions/reportIssue';
import apiService from '../api/client';

function* reportIssue(action) {
  try {
    console.log('[report issue] requested');
    const data = yield call(apiService.post, '/api/report/', { body: action.payload });
    yield put(actions.reportIssueSuccess(data));
    if (!action.isAssignmentForm) {
      browserHistory.push('/start');
    }
  } catch (err) {
    // TODO: FAILURE
    console.error('*reportIssue:', err);
  }
}

export function* watchReportIssue() {
  yield* takeEvery(actions.REPORT_ISSUE, reportIssue);
}
