import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

const menuItems = (menuClass, menuId, { isAuthenticated, onLogoutClick }) => {
  return (
    <ul className={menuClass} id={menuId}>
      <li><Link to="/" className="mdl-navigation__link">Home</Link></li>
      {!isAuthenticated &&
        <li><Link to="/register" className="mdl-navigation__link">Register</Link></li>
      }
      {isAuthenticated &&
        <li><Link to="/report" className="mdl-navigation__link">Report an Issue</Link></li>
      }
      {isAuthenticated
        ? <li><Link className="mdl-navigation__link" onClick={e => onLogoutClick(e)}>Logout</Link></li>
        : <li><Link to="/login" className="mdl-navigation__link">Login</Link></li>
      }
    </ul>
  );
};

class Navbar extends Component {

  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="teal">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">LearnPython2</Link>
            <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
            {menuItems('right hide-on-med-and-down', '', this.props)}
            {menuItems('side-nav', 'mobile-nav', this.props)}
          </div>
        </nav>
      </div>
    );
  }
}

/* eslint-disable */
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};
/* eslint-enable */

export default Navbar;
