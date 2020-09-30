import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions/control';
import UsersModal from './UsersModal';
import Spinner from '../layout/Spinner';

const ControlPanel = ({ control: { users, errors }, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  });

  if (!users || users[0] === null) {
    return <Spinner />
  }

  const sumWallets = users[0].reduce((a, b) => {
    return a + b.wallet;
  }, 0);

  const arrayOfUsers = [];

  // eslint-disable-next-line
  const activeUsers = users[0].map(user => {
    if (user.wallet > 0 || user.wallet < 0) {
      arrayOfUsers.push(user);
    }
  });

  return (
    <div className="jumbotron">
      <h1 className="display-4">Hello, Admin!</h1>
      <p className="lead">Total Users: {users[0].length} </p>
      <p className="lead">
        Total of Money: {'$' + sumWallets.toFixed(2)}
      </p>
      <p className="lead">
        Active Users: {arrayOfUsers.length}
      </p>
      <hr className="my-4" />
      <button type="button" className="btn btn-block btn-primary" data-toggle="modal" data-target="#usersModal">
        Users
      </button>

      {/* modal */}
      <UsersModal listOfUsers={users[0]} />
    </div>
  );
};

ControlPanel.propTypes = {
  control: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  control: state.control,
});

export default connect(mapStateToProps, { fetchUsers })(ControlPanel);
