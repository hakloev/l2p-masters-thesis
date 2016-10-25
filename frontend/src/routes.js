import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { TOKEN_IDENTIFIER } from './common/constants';
import App from './components/App';
import { Login } from './components/login';
import StartQuiz from './components/StartQuiz';
import Question from './components/Question';
import Report from './components/Report';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem(TOKEN_IDENTIFIER)) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/start" />
    <Route path="/login" component={Login} />
    <Route path="/report" component={Report} onEnter={requireAuth} />
    <Route path="/start" component={StartQuiz} onEnter={requireAuth} />
    <Route path="/quiz" component={Question} onEnter={requireAuth} />
  </Route>
);
