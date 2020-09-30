import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { loadUser, logoutUser } from '../../redux/actions/auth';

export const Navbar = ({ auth: { isAuth, user }, loadUser, logoutUser }) => {
  useEffect(() => {
    if (isAuth) {
      loadUser();
    };
  }, [isAuth, loadUser]);

  const logout = () => {
    logoutUser();
    return <Redirect to='/login' />
  };

  const refresh = () => {
    window.location.reload(false);
  };

  const adminLinks = (
    <Fragment>
      <a onClick={refresh} className="nav-link active" style={{ float: "right" }} href="#!"><i className="fas fa-sync-alt"></i></a>
      <a onClick={logout} className="nav-link" href="#!">Logout</a>
      <Link to="/account" className="nav-link">Account</Link>
      <Link to="/account/control" className="nav-link">Control Panel</Link>
      <Link to="/settings" className="nav-link">Settings</Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <a onClick={refresh} className="nav-link active" href="#!"><i className="fas fa-sync-alt"></i></a>
      <Link to="/account" className="nav-link active">Account</Link>
      <a onClick={logout} className="nav-link" href="#!">Logout</a>
      <Link to="/settings" className="nav-link">Settings</Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/" className="nav-link active">Home</Link>
      <Link to="/login" className="nav-link">Login</Link>
    </Fragment>
  );

  const navLinks = () => {
    if (isAuth && user) {
      switch (user.role) {
        case 'admin':
          return adminLinks;
        default:
          return authLinks;
      }
    } else {
      return guestLinks;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="navbar-brand"><i className="fas fa-wallet"></i> Bill's Planner</div>
      {/* toggle */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {navLinks()}
        </div>
      </div>
    </nav>
  )
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, logoutUser })(Navbar);
