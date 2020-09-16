import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../redux/actions/control';

const UserItem = ({ user: { _id, username }, deleteUser }) => {
  const editString = (string) => {
    const lowerCase = string.toLowerCase();
    return lowerCase.replace(/^./, lowerCase[0].toUpperCase())
  };

  const delUser = () => {
    console.log(_id);
    deleteUser(_id);
  };

  return (
    <li className="panel-li">
      <button onClick={delUser} className="btn btn-sm"><i className="fas fa-trash"></i></button> Username: {editString(username)}
    </li>
  );
};

UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserItem);