import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import apiService from '../api/client';
import * as actions from '../actions/compilation';
import { getNewAchievementsRequest } from '../actions/achievements';

// COMPILE CODE START
function* compileCode(action) {
  try {
    console.log('[compileCode] requested');
    const result = yield call(apiService.post, '/api/compile/', { body: action.code });
    if (result.error) {
      Materialize.toast(`You got an compilation error on ${result.line_number}:<br><br>${result.error}`, 5000);
    }
    yield put(actions.compileCodeSuccess(result));
  } catch (err) {
    Materialize.toast(`Unable to compile code, try again later!<br><br>${err}`, 5000);
    yield put(actions.compileCodeFailure(err));
  }
}

export function* watchCompileCode() {
  yield* takeEvery(actions.COMPILE_CODE_REQUEST, compileCode);
}
// COMPILE CODE END

// SUBMIT ANSWER START
function* submitAnswer(action) {
  try {
    console.log('[submitAnswer] requested');
    const data = yield call(apiService.post, '/api/submit/', { body: action.payload });
    yield put(actions.submitAnswerSuccess(data));
    yield put(getNewAchievementsRequest());
  } catch (err) {
    yield put(actions.submitAnswerFailure(err));
    Materialize.toast('Unable to submit answer, try again later!');
  }
}

export function* watchSubmitAnswer() {
  yield* takeEvery(actions.SUBMIT_ANSWER_REQUEST, submitAnswer);
}
// SUBMIT ANSER END
