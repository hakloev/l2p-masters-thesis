import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import AchievementsModal from './AchievementsModal';
import * as actions from '../actions/auth';

const App = props => {
  return (
    <div>
      <Navbar isAuthenticated={props.isAuthenticated} onLogoutClick={props.onLogoutClick} />
      <div className="container">
        {props.children}
      </div>
      <AchievementsModal />
    </div>
  );
};

App.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  const { auth: { isLoggedIn: isAuthenticated } } = state;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: e => {
      e.preventDefault();
      dispatch(actions.logoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
