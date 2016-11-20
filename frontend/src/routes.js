import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import { Login } from './components/login';
import Register from './components/Register';
import StartQuiz from './components/StartQuiz';
import Question from './components/Question';
import Report from './components/Report';
import { getAuthToken } from './common/jwt';

const requireAuth = (nextState, replace) => {
  if (!getAuthToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/start" />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/report" component={Report} onEnter={requireAuth} />
    <Route path="/start" component={StartQuiz} onEnter={requireAuth} />
    <Route path="/quiz" component={Question} onEnter={requireAuth} />
  </Route>
);
