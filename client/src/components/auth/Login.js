import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form onSubmit={onSubmit}>
              <h1 className='h3 mb-3 font-weight-normal'>Sign in</h1>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <button
                type='submit'
                className='btn btn-lg btn-primary btn-block'
              >
                Sign in
              </button>
            </form>
            <p>
              Don't have an account? <Link to='/register'>Sign Up here</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
