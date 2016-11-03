import { call, put, take } from 'redux-saga/effects';

import { getAchievements } from './achievements';
import * as actions from '../actions/stats';
import apiService from '../api/client';

function* getSkills() {
  try {
    console.info(`${actions.GET_SKILLS_REQUEST}`);
    const skills = yield call(apiService.get, '/api/user/skills/');
    yield put(actions.getSkillsSuccess(skills));
  } catch (err) {
    console.error(`${actions.GET_SKILLS_FAILURE}`);
    yield put(actions.getSkillsFailure(err.message));
  }
}

function* getStreaks() {
  try {
    console.info(`${actions.GET_STREAKS_REQUEST}`);
    const streaks = yield call(apiService.get, '/api/user/scores/');
    yield put(actions.getStreaksSuccess(streaks));
  } catch (err) {
    console.error(`${actions.GET_SKILLS_FAILURE}`);
    yield put(actions.getSkillsFailure(err.message));
  }
}

// eslint-disable-next-line
export function* watchAllQuizStats() {
  for (;;) {
    yield take(actions.GET_ALL_QUIZ_STATS);
    yield [
      call(getSkills),
      call(getStreaks),
      call(getAchievements),
    ];
  }
}
