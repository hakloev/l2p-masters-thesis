import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from './actions';
import apiService from '../../api/client';
import { close as closeModal } from '../../components/ProgressSurveyModal';

function* progressSurvey(action) {
  try {
    console.info(`${actions.POST_PROGRESS_SURVEY}`);
    const data = yield call(apiService.post, '/api/survey/', { body: action.payload });
    console.log(data);
    yield put(actions.postProgressSurveySuccess(data));
    Materialize.toast('Success! Thank you for your feedback!', 5000);
    closeModal();
  } catch (error) {
    // TODO: Failure
    console.error(`${actions.POST_PROGRESS_SURVEY_FAILURE} : ${error.message}`);
    yield put(actions.postProgressSurveyFailure(error));
    Materialize.toast('Sorry, unable to submit your form at this point!', 5000);
  }
}

export function* watchPostProgressSurvey() {
  yield* takeEvery(actions.POST_PROGRESS_SURVEY, progressSurvey);
}
