import 'babel-polyfill';

import 'materialize-css';
import 'materialize-css/bin/materialize.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import initializeGoogleAnalytics from './common/analytics';

import configureStore from './configureStore';

import { actions as assignmentActions } from './data/assignment';

require('../styles/base.scss');

initializeGoogleAnalytics();

const appMount = document.getElementById('app');
const store = configureStore();

// Load inital data
store.dispatch(assignmentActions.getAssignmentTypesRequest());

const renderApp = () => {
  // eslint-disable-next-line global-require
  const NextRoot = require('./rootProvider').default;

  ReactDOM.render(
    <AppContainer>
      <NextRoot history={browserHistory} store={store} />
    </AppContainer>,
    appMount
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./rootReducer').default;

    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./rootProvider', () => {
    renderApp();
  });
}
