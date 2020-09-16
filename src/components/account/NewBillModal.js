import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newBill } from '../../redux/actions/account';

const NewBillModal = ({ newBill }) => {
  const [billToAccount, setBill] = useState({
    bill: '',
    description: '',
  });

  const { bill, description } = billToAccount;

  const changeCredentials = e => {
    setBill({ ...billToAccount, [e.target.name]: e.target.value });
  };

  const saveBill = (e) => {
    e.preventDefault();
    newBill(billToAccount);
    setBill({
      bill: 0,
      description: '',
    });
  };

  return (
    <div className="modal fade" id="newBill" aria-labelledby="newBill" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newBill">New Bill:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="col-7">
                  <input
                    onChange={changeCredentials}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={description}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    onChange={changeCredentials}
                    type="text"
                    pattern="[0-9]"
                    className="form-control"
                    placeholder="Value"
                    name="bill"
                    value={bill}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={saveBill} type="button" className="btn btn-primary" data-dismiss="modal">Save</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

NewBillModal.propTypes = {
  newBill: PropTypes.func.isRequired,
};

export default connect(null, { newBill })(NewBillModal);