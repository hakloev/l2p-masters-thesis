import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import { requireAuth } from './components/AuthenticationComponent';
import { Login } from './components/login';
import StartQuiz from './components/StartQuiz';
import Question from './components/Question';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/start" />
    <Route path="/login" component={Login} />
    <Route path="/start" component={requireAuth(StartQuiz)} />
    <Route path="/quiz" component={requireAuth(Question)} />
  </Route>
);
