import 'babel-polyfill';

import 'materialize-css';
import 'materialize-css/bin/materialize.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';


import initializeGoogleAnalytics from './common/analytics';

import configureStore from './configureStore';
import HMRContainer from './containers/HMRContainer';

import { actions as assignmentActions } from './data/assignment';

require('../styles/base.scss');

initializeGoogleAnalytics();

const appMount = document.getElementById('app');
const store = configureStore();

// Load inital data
store.dispatch(assignmentActions.getAssignmentTypesRequest());

const App = (
  <HMRContainer>
    <Root store={store} />
  </HMRContainer>
);

try {
  ReactDOM.render(App, appMount);
  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextApp = require('./Root').default;

      ReactDOM.render(
        <HMRContainer>
          <NextApp store={store} />
        </HMRContainer>,
        appMount
      );
    });
  }
} catch (err) {
    console.error('Render Error:', err);
}

export default App;
