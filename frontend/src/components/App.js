import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { actions as authActions } from '../data/auth';
import AchievementsModal from './AchievementsModal';
import ReportModal from './ReportModal';

const App = props => {
  return (
    <div>
      <Navbar isAuthenticated={props.isAuthenticated} onLogoutClick={props.onLogoutClick} />
      <div id="main-container">
        <div id="inner-container">
          {props.children}
        </div>
      </div>
      <AchievementsModal />
      <ReportModal />
    </div>
  );
};

App.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  const { auth: { login: { isAuthenticated, userName } } } = state;
  return {
    isAuthenticated,
    userName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: e => {
      e.preventDefault();
      dispatch(authActions.logoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
