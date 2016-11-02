import 'materialize-css';
import 'materialize-css/bin/materialize.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import configureStore from './configureStore';

import { getAssignmentTypesRequest } from './actions/assignment';

require('../styles/base.scss');

const appMount = document.getElementById('app');
const store = configureStore();

// Load inital data
store.dispatch(getAssignmentTypesRequest());

const renderApp = () => {
  // eslint-disable-next-line global-require
  const NextRoot = require('./root').default;

  ReactDOM.render(
    <AppContainer>
      <NextRoot history={browserHistory} store={store} />
    </AppContainer>,
    appMount
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers').default;

    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./root', () => {
    renderApp();
  });
}
