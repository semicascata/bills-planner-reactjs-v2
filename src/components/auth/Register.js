import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { registerUser, setLoading, clearErrors } from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';

const Register = ({ auth: { error, isAuth, loading }, registerUser, setLoading, clearErrors }) => {
  useEffect(() => {
    setTimeout(() => {
      clearErrors();
    }, 500);
  }, [clearErrors]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [validation, setValidation] = useState('');

  const { username, email, password, confirm_password } = user;

  const changeCredentials = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const submitRegister = async (e) => {
    e.preventDefault();
    setValidation('');

    setLoading();
    registerUser(user)
      .then(res => {
        if (res === 400) {
          setValidation('Please, fill in all fields');
        } else if (!res) {
          history.push('/login');
        }
      });

    setUser({
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    });
  };

  if (isAuth) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="card">
      <form>

        <div className="auth-title">
          <h2><i className="fas fa-user-plus"></i> Register</h2>
        </div>

        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}

        {validation && <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Validation:</strong> {validation}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}

        <div className="form-group">
          <label><i className="fas fa-user"></i> Username:</label>
          <input
            onChange={changeCredentials}
            type="text"
            className="form-control"
            name="username"
            value={username}
            required
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-envelope"></i> Email:</label>
          <input
            onChange={changeCredentials}
            type="email"
            className="form-control"
            name="email"
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-key"></i> Password:</label>
          <input
            onChange={changeCredentials}
            type="password"
            className="form-control"
            name="password"
            value={password}
            required
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-key"></i> Confirm Password:</label>
          <input
            onChange={changeCredentials}
            type="password"
            className="form-control"
            name="confirm_password"
            value={confirm_password}
            required
          />
        </div>

        <div className="text-center">
          <button onClick={submitRegister} type="submit" className="btn btn-danger btn-block">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser, setLoading, clearErrors })(Register);
