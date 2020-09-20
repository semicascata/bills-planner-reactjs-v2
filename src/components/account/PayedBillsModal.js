import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { payedBills } from '../../redux/actions/account';
import PayedItem from './PayedItem';

const PayedBillsModal = ({ account: { itemsPayed }, payedBills }) => {
  const [billMonth, setMonth] = useState('');
  const [billYear, setYear] = useState('');
  const [validate, setValidate] = useState('');

  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);

  const submitDate = (e) => {
    e.preventDefault();

    if (billYear === '' || billMonth === '') {
      setValidate('Please, fill all fields!');
    } else {
      setValidate('');
      payedBills(`${billYear}-${billMonth}`);
    }
  };

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
          {
            validate !== '' &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Validation:</strong> {validate}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <div className="date-form">
            <div className="form-group">
              <div className="row">
                <div className="col-4">
                  <select onChange={changeYear} className="form-control">
                    <option value="" defaultValue>Select Year</option>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                  </select>
                </div>
                <div className="col-8">
                  <select onChange={changeMonth} className="form-control">
                    <option value="" defaultValue>Select Month</option>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                  </select>
                </div>
                <button onClick={submitDate} className="btn btn-block btn-primary">Submit</button>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <ul>
              {
                itemsPayed === null || itemsPayed[0].length === 0 ? (
                  <li>All good!</li>
                ) : (
                    itemsPayed[0].map(item => <PayedItem item={item} key={item._id} />)
                  )
              }
            </ul>
          </div>
          <div className="modal-footer">
            <p><i>*Clicking on the trash can, the bill will return to the pendent bills.</i></p>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

PayedBillsModal.propTypes = {
  account: PropTypes.object.isRequired,
  payedBills: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, { payedBills })(PayedBillsModal);
