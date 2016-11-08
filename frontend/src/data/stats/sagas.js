import { call, put, take } from 'redux-saga/effects';

import apiService from '../../api/client';
import { sagas as achievementSagas } from '../achievements';
import * as actions from './actions';

function* getSkills() {
  try {
    console.info(`${actions.GET_SKILLS_REQUEST}`);
    const skills = yield call(apiService.get, '/api/user/skills/');
    yield put(actions.getSkillsSuccess(skills));
  } catch (error) {
    console.error(`${actions.GET_SKILLS_FAILURE}: ${error.message}`);
    yield put(actions.getSkillsFailure(error.message));
  }
}

function* getStreaks() {
  try {
    console.info(`${actions.GET_STREAKS_REQUEST}`);
    const streaks = yield call(apiService.get, '/api/user/scores/');
    yield put(actions.getStreaksSuccess(streaks));
  } catch (error) {
    console.error(`${actions.GET_SKILLS_FAILURE}: ${error.message}`);
    yield put(actions.getSkillsFailure(error.message));
  }
}

// eslint-disable-next-line
export function* watchAllQuizStats() {
  for (;;) {
    yield take(actions.GET_ALL_QUIZ_STATS);
    yield [
      // call(getSkills),
      call(getStreaks),
      call(achievementSagas.getAchievements),
    ];
  }
}
