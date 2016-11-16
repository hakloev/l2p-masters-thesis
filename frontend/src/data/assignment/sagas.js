import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import apiService from '../../api/client';

import * as actions from './actions';
import * as selectors from './selectors';
import { actions as achievementActions } from '../achievements';
import { actions as statsActions } from '../stats';

import { open as openSurveyModal } from '../../components/ProgressSurveyModal';

// START QUIZ START
function* startQuiz(action) {
  try {
    console.info(`${actions.START_QUIZ_REQUEST}`);
    const data = yield call(apiService.post, '/api/assignment/new/', { body: action.payload });
    yield put(actions.startQuizSuccess(data));
    yield put(actions.setStartAssignmentTime());
    browserHistory.push('/quiz');
  } catch (error) {
    console.error(`${actions.START_QUIZ_FAILURE}: ${error.message}`);
    yield put(actions.startQuizFailure(error.message));
    Materialize.toast('Unable to start quiz, try again later!', 5000);
  }
}

export function* watchStartQuiz() {
  yield* takeEvery(actions.START_QUIZ_REQUEST, startQuiz);
}
// START QUIZ END

// GET ASSIGNMENT TYPES START
function* getAssignmentTypes() {
  try {
    console.info(`${actions.GET_ASSIGNMENT_TYPES_REQUEST}`);
    const types = yield call(apiService.get, '/api/assignment-types/');
    yield put(actions.getAssignmentTypesSuccess(types));
  } catch (error) {
    console.error(`${actions.GET_ASSIGNMENT_TYPES_FAILURE}: ${error.message}`);
    yield put(actions.getAssignmentTypesFailure(error.message));
  }
}

export function* watchAssignmentTypes() {
  yield* takeEvery(actions.GET_ASSIGNMENT_TYPES_REQUEST, getAssignmentTypes);
}
// GET ASSIGNMENT TYPES END

// COMPILE CODE START
function* compileCode(action) {
  try {
    console.info(`${actions.COMPILE_CODE_REQUEST}`);
    const result = yield call(apiService.post, '/api/compile/', { body: action.code });
    if (result.timeout) {
      Materialize.toast('Your code timed out, please try again!', 5000);
    } else if (result.error) {
      Materialize.toast(`Your code got a compilation error on ${result.line_number}:<br><br>${result.error}`, 5000);
    }
    yield put(actions.compileCodeSuccess(result));
    const answer = yield select(selectors.isCorrectSolution);
    if (!answer && !result.timeout && !result.error) {
      Materialize.toast('The solution is incorrect.', 5000);
    }
  } catch (error) {
    console.error(`${actions.COMPILE_CODE_FAILURE}: ${error.message}`);
    Materialize.toast(`Unable to compile code, try again later!<br><br>${error.message}`, 5000);
    yield put(actions.compileCodeFailure(error.message));
  }
}

export function* watchCompileCode() {
  yield* takeEvery(actions.COMPILE_CODE_REQUEST, compileCode);
}
// COMPILE CODE END

// SUBMIT ANSWER START
function* submitAnswer(action) {
  try {
    console.info(`${actions.SUBMIT_ANSWER_REQUEST}`);
    const data = yield call(apiService.post, '/api/submit/', { body: action.payload });
    yield put(actions.submitAnswerSuccess(data));
    yield put(actions.setStartAssignmentTime());
    yield put(statsActions.getUserStreakRequest());
    yield put(achievementActions.getNewAchievementsRequest());
    if (data.show_progress_survey) {
      openSurveyModal();
    }
  } catch (error) {
    console.error(`${actions.SUBMIT_ANSWER_FAILURE}: ${error.message}`);
    Materialize.toast('Unable to submit answer, try again later!', 5000);
    yield put(actions.submitAnswerFailure(error.message));
  }
}

export function* watchSubmitAnswer() {
  yield* takeEvery(actions.SUBMIT_ANSWER_REQUEST, submitAnswer);
}
// SUBMIT ANSER END
