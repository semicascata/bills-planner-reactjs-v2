import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

const UsersModal = ({ listOfUsers }) => {
  return (
    <div className="modal fade" id="usersModal" aria-labelledby="usersModal" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="usersModal">Users:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {
                !listOfUsers ?
                  'No users' :
                  listOfUsers.map(user => <UserItem user={user} key={user._id} />)
              }
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

UsersModal.propTypes = {
  listOfUsers: PropTypes.any.isRequired, // array(if has bills) & string(if has no bills)
};

export default UsersModal;
