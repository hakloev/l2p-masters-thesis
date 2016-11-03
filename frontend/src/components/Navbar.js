import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ isAuthenticated, onLogoutClick }) => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper orange">
          <Link to="/" className="brand-logo">LearnPython2</Link>
          <ul className="right hide-on-med-and-down">
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
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default Navbar;
