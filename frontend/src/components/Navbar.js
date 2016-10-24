import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ isAuthenticated, onLogoutClick }) => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <Link to="/" className="brand-logo">LearnPython2</Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/" className="mdl-navigation__link">Home</Link></li>
          {isAuthenticated
            ? <li><Link className="mdl-navigation__link" onClick={e => onLogoutClick(e)}>Logout</Link></li>
            : <li><Link to="/login" className="mdl-navigation__link">Login</Link></li>
          }
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default Navbar;
