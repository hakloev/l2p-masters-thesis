import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

// eslint-disable-next-line
class RootProvider extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router key={Math.random()} history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

RootProvider.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default RootProvider;
