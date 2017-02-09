import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

import * as actions from './actions';
import { actions as modalActions } from '../modals';
import apiService from '../../api/client';

function* reportIssue(action) {
  try {
    console.info(`${actions.REPORT_ISSUE}`);
    const data = yield call(apiService.post, '/api/report/', { body: action.payload });
    yield put(actions.reportIssueSuccess(data));
    toastr.success('Issue', 'Thank you for your feedback!');
    if (!action.isAssignmentForm) {
      browserHistory.push('/start');
    } else {
      yield put(modalActions.toggleReportModal());
    }
  } catch (error) {
    // TODO: Failure
    console.error(`${actions.REPORT_ISSUE_FAILURE} : ${error.message}`);
    if (action.isAssignmentForm) {
      yield put(modalActions.toggleReportModal());
    }
    toastr.error('Error', 'Sorry, unable to submit your form at this point, try again later!');
  }
}

export function* watchReportIssue() {
  yield* takeEvery(actions.REPORT_ISSUE, reportIssue);
}
