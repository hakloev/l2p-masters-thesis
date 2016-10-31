import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';

import 'materialize-css';
import 'materialize-css/bin/materialize.css';
import 'font-awesome/css/font-awesome.min.css';

import configureStore from './configureStore';
import routes from './routes';
import { getAssignmentTypesRequest } from './actions/assignment';

require('../styles/base.scss');

const appMount = document.getElementById('app');
const store = configureStore();

// Load inital data
store.dispatch(getAssignmentTypesRequest());

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Router history={browserHistory} routes={routes} />
    </AppContainer>
  </Provider>,
  appMount
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line
    const routes = require('./routes').default;

    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Router history={browserHistory} routes={routes} />
        </AppContainer>
      </Provider>,
      appMount
    );
  });
}
