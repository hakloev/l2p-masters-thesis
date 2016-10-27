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
  userName: PropTypes.string,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  const { auth: { isAuthenticated, userName } } = state;
  return { isAuthenticated, userName };
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
