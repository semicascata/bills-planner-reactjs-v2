import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, auth: { isAuth, loading }, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : isAuth ? (
        <Component {...props} />
      ) : (
            <Redirect to='/login' />
          )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);