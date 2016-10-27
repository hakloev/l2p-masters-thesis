import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export function requireAuth(InnerComponent) {

  /*
    This is wrapper component that redirects to login as long as the user is not
    authenticated. This is done to prevent unauthorized access to the quiz itself
    without having supplied credentials.
  */
  class AuthenticationComponent extends Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        browserHistory.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <InnerComponent {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  AuthenticationComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });


  return connect(mapStateToProps)(AuthenticationComponent);
}
