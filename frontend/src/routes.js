import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import { requireAuth } from './components/AuthenticationComponent';
import { Login } from './components/login';
import StartQuiz from './components/StartQuiz';
import Question from './components/Question';
import Report from './components/Report';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/start" />
    <Route path="/login" component={Login} />
    <Route path="/report" component={requireAuth(Report)} />
    <Route path="/start" component={requireAuth(StartQuiz)} />
    <Route path="/quiz" component={requireAuth(Question)} />
  </Route>
);
