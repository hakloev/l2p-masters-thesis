import 'babel-polyfill';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './Root';
import configureStore from './configureStore';
import HMRContainer from './containers/HMRContainer';

import initializeGoogleAnalytics from './common/analytics';

import { actions as assignmentActions } from './data/assignment';

require('../styles/base.scss');

injectTapEventPlugin();
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
