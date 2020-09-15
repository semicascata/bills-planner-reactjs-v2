import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { payBills } from '../../redux/actions/account';
import PendentItem from './PendentItem';

const PendentModal = ({ pendentItems, payBills }) => {
  return (
    <div className="modal fade" id="pendentBills" aria-labelledby="pendentBills" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="pendentBills">Pendent Bills:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {
                pendentItems.length === 0 || pendentItems === 'All good' ? (
                  <li>All good!</li>
                ) : (
                    pendentItems.map(item => <PendentItem item={item} key={item._id} />)
                  )
              }
            </ul>
          </div>
          <div className="modal-footer">
            {pendentItems !== 'All good' &&
              <button onClick={payBills} type='submit' className="btn btn-danger">Pay everything</button>
            }
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

PendentModal.propTypes = {
  payBills: PropTypes.func.isRequired,
  pendentItems: PropTypes.any.isRequired, // array(if has bills) & string(if has no bills)
};

export default connect(null, { payBills })(PendentModal);
