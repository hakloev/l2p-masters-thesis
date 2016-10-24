import { call, put, take } from 'redux-saga/effects';

import { getAchievements } from './achievements';
import * as actions from '../actions/quiz';
import api from '../api/service';

function* getSkills() {
  try {
    console.log('[getSkills] requested');
    const skills = yield call(api.getSkills);
    yield put(actions.getSkillsSuccess(skills));
  } catch (err) {
    yield put(actions.getSkillsFailure(err.message));
  }
}

function* getStreaks() {
  try {
    console.log('[getStreaks] requested');
    const streaks = yield call(api.getStreaks);
    yield put(actions.getStreaksSuccess(streaks));
  } catch (err) {
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
