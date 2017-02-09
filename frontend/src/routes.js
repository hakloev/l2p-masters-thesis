import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import MainLayout from './layout/MainLayout';

import StartContainer from './containers/StartContainer';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Register from './containers/Register';
import Report from './containers/Report';

import Question from './components/Question';
import { getAuthToken } from './common/jwt';

const requireAuth = (nextState, replace) => {
  if (!getAuthToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export function routes() {
  return (
    <Route path="/" component={MainLayout}>
      <IndexRedirect to="/start" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/report" component={Report} onEnter={requireAuth} />
      <Route path="/start" component={StartContainer} onEnter={requireAuth} />
      <Route path="/quiz" component={Question} onEnter={requireAuth} />
      <Route path="*" title="Page Not Found" component={NotFound} />
    </Route>
  );
}
