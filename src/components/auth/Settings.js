import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, changePassword, setLoading } from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';
import FixWalletModal from '../account/FixWalletModal';

const Settings = ({ auth: { user, loading }, loadUser, changePassword, setLoading }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [change, setPass] = useState({
    current: '',
    newPass: '',
    confirmNew: '',
  });

  const [validation, setValidation] = useState('');
  const [success, setSuccess] = useState('');

  if (loading || user === null) {
    return <Spinner />
  }

  const { current, newPass, confirmNew } = change;

  const changeCredentials = (e) => setPass({ ...change, [e.target.name]: e.target.value });

  // loading, validation, set new password, set form to null
  const submitChanges = () => {
    if (current === '' || newPass === '' || confirmNew === '') {
      setValidation('Please, fill in all fields!');
    } else if (newPass === confirmNew) {
      changePassword(change)
        .then(res => {
          if (res !== "Password updated") {
            setValidation('Wrong password');
          } else {
            setSuccess('Done it!');
          }
        });

      setPass({
        current: '',
        newPass: '',
        confirmNew: '',
      });
    } else {
      setValidation('Passwords dont match!');
    }

    setTimeout(() => {
      setValidation('');
      setSuccess('');
    }, 5000);
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Settings:</h1>
      {/* <p className="lead"></p> */}
      <hr className="my-4" />

      {/* trigger modal */}
      <button type="button" className="btn btn-warning btn-account" data-toggle="modal" data-target="#fixWallet">
        Fix Wallet Value
      </button>

      <h3>
        Change password?
      </h3>

      {validation &&
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Validation:</strong> {validation}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}

      {success &&
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success:</strong> {success}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}

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
        <div className="form-group">
          <label><i className="fas fa-key"></i> Confirm new password:</label>
          <input
            onChange={changeCredentials}
            type="password"
            className="form-control"
            name="confirmNew"
            value={confirmNew}
            required
          />
        </div>
        <div className="text-center">
          <div className="form-btn">
            <button onClick={submitChanges} type="button" className="btn btn-info btn-block">
              Change
          </button>
          </div>
          <p style={{ fontSize: "12px" }}><i>*Password must be longer than or equal to 6 characters</i></p>
        </div>
      </form>

      {/* modal */}
      <FixWalletModal />
    </div>
  );
};

Settings.propTypes = {
  changePassword: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, changePassword, setLoading })(Settings);
