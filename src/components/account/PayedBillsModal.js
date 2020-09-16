import React from 'react';
import PropTypes from 'prop-types';
import PayedItem from './PayedItem';

const PayedBillsModal = ({ payedItems }) => {
  return (
    <div className="modal fade" id="payedBills" aria-labelledby="payedBills" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="payedBills">Payed:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {
                payedItems.length === 0 || payedItems === 'All good' ? (
                  <li>All good!</li>
                ) : (
                    payedItems.map(item => <PayedItem item={item} key={item._id} />)
                  )
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

PayedBillsModal.propTypes = {
  payedItems: PropTypes.any.isRequired, // array(if has bills) & string(if has no bills)
};

export default PayedBillsModal;
