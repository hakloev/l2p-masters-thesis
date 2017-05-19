import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Toaster from 'react-redux-toastr';

import { routes } from './routes';

export default class Root extends Component {

  render() {
    const store = this.props.store;

    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>
            {routes()}
          </Router>
          <Toaster
            timeOut={8000}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </div>
      </Provider>
    );
  }
}
