import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../redux/actions/control';

const UserItem = ({ user: { _id, username, wallet }, deleteUser }) => {
  const editString = (string) => {
    const lowerCase = string.toLowerCase();
    return lowerCase.replace(/^./, lowerCase[0].toUpperCase())
  };

  const delUser = () => {
    deleteUser(_id);
  };

  const activeBadge = (
    <Fragment>
      <span className="badge badge-success">Active</span>
    </Fragment>
  );

  const inactiveBadge = (
    <Fragment>
      <span className="badge badge-danger">Inactive</span>
    </Fragment>
  );

  return (
    <li className="panel-li">
      {username !== 'admin' ?
        <button onClick={delUser} className="btn btn-sm">
          <i className="fas fa-trash"></i>
        </button> :
        <button className="btn btn-sm">
          <i className="fas fa-crown"></i>
        </button>
      } Username: {editString(username)}{" - "}
      {wallet > 0 ? activeBadge : inactiveBadge}
    </li>
  );
};

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserItem);