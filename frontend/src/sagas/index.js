import { fork } from 'redux-saga/effects';

import loginFlow from './auth';
import { watchAllQuizStats } from './stats';
import { watchAchievements, watchNewAchievements } from './achievements';
import {
  watchCompileCode,
  watchSubmitAnswer,
} from './compilation';
import {
  watchStartQuiz,
  watchAssignmentTypes,
} from './assignment';

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
