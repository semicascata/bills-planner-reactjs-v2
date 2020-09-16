import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCredit } from '../../redux/actions/account';

const AddCreditModal = ({ addCredit }) => {
  const [credit, setCredit] = useState('');

  const changeCredentials = e => {
    setCredit(e.target.value);
  };

  const addNewCredit = (e) => {
    e.preventDefault();
    addCredit(+credit);
    setCredit(0);
  };

  return (
    <div className="modal fade" id="addCredit" aria-labelledby="addCredit" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCredit">Add Credit:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="col">
                  <input
                    onChange={changeCredentials}
                    type="text"
                    pattern="[0-9]"
                    className="form-control"
                    placeholder="Credit"
                    name="credit"
                    value={credit}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={addNewCredit} type="button" className="btn btn-primary" data-dismiss="modal">Add</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCreditModal.propTypes = {
  addCredit: PropTypes.func.isRequired,
};

export default connect(null, { addCredit })(AddCreditModal);