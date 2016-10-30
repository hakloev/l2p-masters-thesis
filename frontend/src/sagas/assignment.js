import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as actions from '../actions/quiz';
import * as achievementsActions from '../actions/achievements';
import apiService from '../api/client';

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


// COMPILE CODE START
function* compileCode(action) {
  try {
    console.log('[compileCode] requested');
    const result = yield call(apiService.post, '/api/compile/', { body: action.code });
    yield put(actions.compileCodeSuccess(result));
  } catch (err) {
    console.error('*compileCode:', err);
  }
}

export function* watchCompileCode() {
  yield* takeEvery(actions.COMPILE_CODE_REQUEST, compileCode);
}
// COMPILE CODE END


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


// SUBMIT ANSWER START
function* submitAnswer(action) {
  try {
    console.log('[submitAnswer] requested');
    const data = yield call(apiService.post, '/api/submit/', { body: action.payload });
    yield put(actions.submitAnswerSuccess(data));
    yield put(achievementsActions.getNewAchievementsRequest());
  } catch (err) {
    console.error('*submitAnswer: ', err);
  }
}

export function* watchSubmitAnswer() {
  yield* takeEvery(actions.SUBMIT_ANSWER_REQUEST, submitAnswer);
}
// SUBMIT ANSER END
