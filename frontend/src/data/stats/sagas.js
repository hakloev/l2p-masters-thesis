import { takeEvery } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import apiService from '../../api/client';
import { sagas as achievementSagas } from '../achievements';
import * as actions from './actions';

function* getUserStreaks() {
  try {
    console.info(`${actions.GET_USER_STREAK_REQUEST}`);
    const streaks = yield call(apiService.get, '/api/user/streak/');
    yield put(actions.getUserStreakSuccess(streaks));
  } catch (error) {
    console.error(`${actions.GET_USER_STREAK_FAILURE}: ${error.message}`);
    yield put(actions.getUserStreakFailure(error.message));
  }
}

function* getAssignmentTypeStreaks() {
  try {
    console.info(`${actions.GET_ASSIGNMENT_TYPE_STREAKS_REQUEST}`);
    const streaks = yield call(apiService.get, '/api/user/scores/');
    yield put(actions.getAssignmentTypeStreaksSuccess(streaks));
  } catch (error) {
    console.error(`${actions.GET_ASSIGNMENT_TYPE_STREAKS_FAILURE}: ${error.message}`);
    yield put(actions.getAssignmentTypeStreaksFailure(error.message));
  }
}

export function* watchAssignmentTypeStreaks() {
  yield* takeEvery(actions.GET_ASSIGNMENT_TYPE_STREAKS_REQUEST, getAssignmentTypeStreaks);
}

// eslint-disable-next-line
export function* watchAllQuizStats() {
  for (;;) {
    yield take(actions.GET_ALL_QUIZ_STATS);
    yield [
      call(getUserStreaks),
      call(getAssignmentTypeStreaks),
      call(achievementSagas.getAchievements),
    ];
  }
}
