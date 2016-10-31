import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import apiService from '../api/client';

import * as actions from '../actions/assignment';

// START QUIZ START
function* startQuiz(action) {
  try {
    console.log('[startQuiz] requested');
    const data = yield call(apiService.post, '/api/assignment/new/', { body: action.payload });
    yield put(actions.startQuizSuccess(data));
    browserHistory.push('/quiz');
  } catch (err) {
    // TODO: FAILURE
    console.error('*startQuiz:', err);
  }
}

export function* watchStartQuiz() {
  yield* takeEvery(actions.START_QUIZ_REQUEST, startQuiz);
}
// START QUIZ END

// GET ASSIGNMENT TYPES START
function* getAssignmentTypes() {
  try {
    console.log('[getAssignmentTypes] requested');
    const types = yield call(apiService.get, '/api/assignment-types/');
    yield put(actions.getAssignmentTypesSuccess(types));
  } catch (err) {
    yield put(actions.getAssignmentTypesFailure(err.message));
  }
}

export function* watchAssignmentTypes() {
  yield* takeEvery(actions.GET_ASSIGNMENT_TYPES_REQUEST, getAssignmentTypes);
}
// GET ASSIGNMENT TYPES END
