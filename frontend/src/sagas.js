import { fork } from 'redux-saga/effects';

import loginFlow from './sagas/auth';
import { watchAllQuizStats } from './sagas/stats';
import { watchAchievements, watchNewAchievements } from './sagas/achievements';
import {
  watchCompileCode,
  watchSubmitAnswer,
} from './sagas/compilation';
import {
  watchStartQuiz,
  watchAssignmentTypes,
} from './sagas/assignment';

export default function* root() {
  yield [
    fork(watchAllQuizStats),
    watchStartQuiz(),
    watchCompileCode(),
    watchAssignmentTypes(),
    watchSubmitAnswer(),
    watchAchievements(),
    watchNewAchievements(),
    loginFlow(),
  ];
}
