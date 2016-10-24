import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as actions from '../actions/achievements';
import { open as openModal } from '../components/AchievementsModal';
import api from '../api/service';

function* getNewAchievements() {
  try {
    console.log('[getNewAchievements] requested');
    const data = yield call(api.getNewAchievements);
    yield put(actions.getNewAchievementsSuccess(data.achievements));
    if (data.achievements.length > 0) {
      openModal();
    }
  } catch (err) {
    // TODO: FAILURE
    console.error('*getNewAchievements: ', err);
  }
}

export function* watchNewAchievements() {
  yield* takeEvery(actions.GET_NEW_ACHIEVEMENTS_REQUEST, getNewAchievements);
}

// Exported for stats to use it in getAllQuizStats
export function* getAchievements() {
  try {
    console.log('[getAchievements] requested');
    const data = yield call(api.getAchievements);
    yield put(actions.getAchievementsSuccess(data));
  } catch (err) {
    // TODO: FAILURE
    console.error('*getAchievements: ', err);
  }
}

export function* watchAchievements() {
  yield* takeEvery(actions.GET_ACHIEVEMENTS_REQUEST, getAchievements);
}
