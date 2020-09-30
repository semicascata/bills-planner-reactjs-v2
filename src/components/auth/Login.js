import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser, setLoading, clearErrors } from '../../redux/actions/auth';
import Spinner from '../layout/Spinner';

const Login = ({ auth: { error, isAuth, loading }, loginUser, setLoading, clearErrors }) => {
  useEffect(() => {
    setTimeout(() => {
      clearErrors();
    }, 500);
  }, [clearErrors]);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [validation, setValidation] = useState('');

  const { username, password } = user;

  const changeCredentials = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setValidation("");

    if (username === "" || password === "") {
      setValidation('Please, fill in all fields!');
    } else {
      setLoading();
      loginUser(user);

      setUser({
        username: '',
        password: '',
      });
    }
  };

  if (isAuth) {
    return <Redirect to="/account" />
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="card">
      <form>

        <div className="auth-title">
          <h2><i className="fas fa-sign-in-alt"></i> Login</h2>
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

        <div className="text-center">
          <button onClick={submitLogin} type="submit" className="btn btn-danger btn-block">
            Sign In
          </button>
          <hr />
          New user? <Link to="/signup">Sign up!</Link>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser, setLoading, clearErrors })(Login);
