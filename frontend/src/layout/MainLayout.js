import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import theme from './theme';

import { actions as authActions } from '../data/auth';

const Menu = ({ isAuthenticated, onLogoutClick, ...otherProps }) => (
  <IconMenu
    {...otherProps}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="Home"
      containerElement={<Link to="/start" />}
    />
    {isAuthenticated &&
      <MenuItem
        primaryText="Report an Issue"
        containerElement={<Link to="/report" />}
      />
    }
    {!isAuthenticated &&
      <MenuItem
        primaryText="Register"
        containerElement={<Link to="/register" />}
      />
    }
    {isAuthenticated ?
      <MenuItem
        primaryText="Sign Out"
        onTouchTap={onLogoutClick}
      />
      :
      <MenuItem
        primaryText="Sign In"
        containerElement={<Link to="/login" />}
      />
    }
  </IconMenu>
);
Menu.muiName = 'IconMenu';


class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object,
  };

  render() {
    const { children, location, isAuthenticated, onLogoutClick } = this.props;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div id="main-container">
          <AppBar
            title={<Link to="/">LearnPython</Link>}
            showMenuIconButton={false}
            iconElementRight={<Menu isAuthenticated={isAuthenticated} onLogoutClick={onLogoutClick} />}
          />
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
