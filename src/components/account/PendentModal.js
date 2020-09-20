import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBills, payBills } from '../../redux/actions/account';
import PendentItem from './PendentItem';

const PendentModal = ({ account: { itemsToPay }, loadBills, payBills }) => {
  const [billMonth, setMonth] = useState('');
  const [billYear, setYear] = useState('');
  const [validate, setValidate] = useState('');


  const changeMonth = (e) => setMonth(e.target.value);
  const changeYear = (e) => setYear(e.target.value);

  const submitDate = (e) => {
    e.preventDefault();

    if (billYear === '' || billMonth === '') {
      setValidate('Please, fill all fields!');
    } else {
      setValidate('');
      loadBills(`${billYear}-${billMonth}`);
    }
  };

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
                itemsToPay === null || itemsToPay[0] === 'All good' ? (
                  <li>Nothing here today...</li>
                ) : (
                    itemsToPay[0].map(item => <PendentItem item={item} key={item._id} />)
                  )
              }
            </ul>
          </div>
          <div className="modal-footer">
            <button onClick={payBills} type='submit' className="btn btn-danger">Pay everything</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

PendentModal.propTypes = {
  loadBills: PropTypes.func.isRequired,
  payBills: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, { loadBills, payBills })(PendentModal);
