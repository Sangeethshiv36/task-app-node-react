import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({
  auth,
  getCurrentProfile,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {' '}
      <div className='container'>
        <div className='jumbotron mt-5'>
          <div className='col-sm-8 mx-auto'>
            <h1 className='text-center'>USER PROFILE</h1>
          </div>
          <table className='table col-md-6 mx-auto'>
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{profile.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{profile.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{profile.gender}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{profile.country}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
