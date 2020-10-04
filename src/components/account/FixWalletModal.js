import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fixWallet } from '../../redux/actions/account';

const FixWalletModal = ({ fixWallet }) => {
  const [credit, setCredit] = useState('');

  const changeCredit = e => {
    setCredit(e.target.value);
  };

  const addNewCredit = (e) => {
    e.preventDefault();
    console.log(+credit); // delete later
    fixWallet(+credit);
    setCredit('');
  };

  return (
    <div className="modal fade" id="fixWallet" aria-labelledby="fixWallet" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="fixWallet">Change Wallet Credit:</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="col">
                  <input
                    onChange={changeCredit}
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
            <button onClick={addNewCredit} type="button" className="btn btn-primary" data-dismiss="modal">Fix</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

FixWalletModal.propTypes = {
  fixWallet: PropTypes.func.isRequired,
};

export default connect(null, { fixWallet })(FixWalletModal);
