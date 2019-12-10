import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const loginRegLinks = (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link to='/profile' className='nav-link'>
          User
        </Link>
      </li>
      <li className='nav-item'>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark rounded'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarsExample10'
        aria-controls='navbarsExample10'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div
        className='collapse navbar-collapse justify-content-md-center'
        id='navbarsExample10'
      >
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
        </ul>
        {!loading && (
          <Fragment>{isAuthenticated ? userLinks : loginRegLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
