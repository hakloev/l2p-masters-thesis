import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import apiService from '../../api/client';
import { actions as modalActions } from '../modals';
import * as actions from './actions';

function* getNewAchievements() {
  try {
    console.info(`Took action: ${actions.GET_NEW_ACHIEVEMENTS_REQUEST}`);
    const data = yield call(apiService.get, '/api/user/achievements/new/');
    yield put(actions.getNewAchievementsSuccess(data.achievements));
    if (data.achievements.length > 0) {
      yield put(modalActions.toggleAchievementsModal());
    }
  } catch (error) {
    console.error(`${actions.GET_NEW_ACHIEVEMENTS_FAILURE}: ${error.message}`);
    yield put(actions.getNewAchievementsFailure(error.message));
  }
}

export function* watchNewAchievements() {
  yield* takeEvery(actions.GET_NEW_ACHIEVEMENTS_REQUEST, getNewAchievements);
}

// Exported for stats to use it in getAllQuizStats
export function* getAchievements() {
  try {
    console.info(`${actions.GET_ACHIEVEMENTS_REQUEST}`);
    const data = yield call(apiService.get, '/api/user/achievements/');
    yield put(actions.getAchievementsSuccess(data));
  } catch (error) {
    console.error(`${actions.GET_ACHIEVEMENTS_FAILURE}: ${error.message}`);
    yield put(actions.getAchievementsFailure(error.message));
  }
}

export function* watchAchievements() {
  yield* takeEvery(actions.GET_ACHIEVEMENTS_REQUEST, getAchievements);
}
