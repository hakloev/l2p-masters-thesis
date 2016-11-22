import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as actions from './actions';
import apiService from '../../api/client';
import { close as closeModal } from '../../components/ReportModal';

function* reportIssue(action) {
  try {
    console.info(`${actions.REPORT_ISSUE}`);
    const data = yield call(apiService.post, '/api/report/', { body: action.payload });
    yield put(actions.reportIssueSuccess(data));
    Materialize.toast('Success, thank you for your feedback!', 5000);
    if (!action.isAssignmentForm) {
      browserHistory.push('/start');
    } else {
      closeModal();
    }
  } catch (error) {
    // TODO: Failure
    console.error(`${actions.REPORT_ISSUE_FAILURE} : ${error.message}`);
    if (action.isAssignmentForm) {
      closeModal();
    }
    Materialize.toast('Sorry, unable to submit your form at this point, try again later!', 5000);
  }
}

export function* watchReportIssue() {
  yield* takeEvery(actions.REPORT_ISSUE, reportIssue);
}
