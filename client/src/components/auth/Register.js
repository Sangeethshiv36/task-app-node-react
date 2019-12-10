import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { CountryDropdown } from 'react-country-region-selector';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    country: '',
    gender: ''
  });

  const { first_name, last_name, email, password, country, gender } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('success');
  };

  const countrySelect = e => setFormData({ ...formData, country: e });
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form onSubmit={onSubmit}>
              <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
              <div className='form-group'>
                <label htmlFor='name'>First name</label>
                <input
                  type='text'
                  className='form-control'
                  name='first_name'
                  placeholder='Enter your first name'
                  value={first_name}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>Last name</label>
                <input
                  type='text'
                  className='form-control'
                  name='last_name'
                  placeholder='Enter your lastname name'
                  value={last_name}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='form-check-label' htmlFor='gender'>
                  Gender:
                </label>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value='male'
                    checked={gender === 'male'}
                    onChange={e => onChange(e)}
                  />
                  <label className='form-check-label' htmlFor='Male'>
                    Male
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value='female'
                    checked={gender === 'female'}
                    onChange={e => onChange(e)}
                  />
                  <label className='form-check-label' htmlFor='Female'>
                    Female
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='country'>Country</label>
                <CountryDropdown
                  className='form-control'
                  value={country}
                  name='country'
                  onChange={e => countrySelect(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={e => onChange(e)}
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
                />
              </div>
              <button
                type='submit'
                className='btn btn-lg btn-primary btn-block'
              >
                Register
              </button>
            </form>
            <p>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
