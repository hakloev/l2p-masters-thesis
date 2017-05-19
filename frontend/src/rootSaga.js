import { fork } from 'redux-saga/effects';

import { sagas as authSagas } from './data/auth';
import { sagas as statsSagas } from './data/stats';
import { sagas as issueSagas } from './data/issue';
import { sagas as surveySagas } from './data/survey';
import { sagas as achievementsSagas } from './data/achievements';
import { sagas as assignmentSagas } from './data/assignment';

export default function* root() {
  yield [
    fork(statsSagas.watchAllQuizStats),
    statsSagas.watchUserStreaks(),

    assignmentSagas.watchStartQuiz(),
    assignmentSagas.watchAssignmentTypes(),
    assignmentSagas.watchCompileCode(),
    assignmentSagas.watchSubmitAnswer(),

    achievementsSagas.watchAchievements(),
    achievementsSagas.watchNewAchievements(),

    issueSagas.watchReportIssue(),

    surveySagas.watchPostProgressSurvey(),

    authSagas.watchRegistration(),
    authSagas.loginFlow(),
  ];
}
