import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, changePassword } from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';

const Settings = ({ auth: { user, loading }, loadUser, changePassword }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [change, setPass] = useState({
    current: '',
    newPass: '',
  });

  if (loading || user === null) {
    return <Spinner />
  }

  const { current, newPass } = change;

  const changeCredentials = (e) => setPass({ ...change, [e.target.name]: e.target.value });

  const submitChanges = () => {
    changePassword(change).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Settings:</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <h3>
        Change password?
      </h3>
      <form className="change-credentials-form">
        <div className="form-group">
          <label><i className="fas fa-user"></i> Current Password:</label>
          <input
            onChange={changeCredentials}
            type="password"
            className="form-control"
            name="current"
            value={current}
            required
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-key"></i> New Password:</label>
          <input
            onChange={changeCredentials}
            type="password"
            className="form-control"
            name="newPass"
            value={newPass}
            required
          />
        </div>
        <div className="text-center">
          <div className="form-btn">
            <button onClick={submitChanges} type="submit" className="btn btn-info btn-block">
              Change
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Settings.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, changePassword })(Settings);
