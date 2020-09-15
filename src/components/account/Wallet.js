import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBills } from '../../redux/actions/account';
import Spinner from '../layout/Spinner';
import PendentModal from './PendentModal';
import NewBillModal from './NewBillModal';

const Wallet = ({ account: { wallet, walletAfterPay, totalToPay, itemsToPay }, loadBills }) => {
  useEffect(() => {
    setTimeout(() => {
      loadBills();
    }, 1000)
  }, [loadBills]);

  if (!wallet) {
    return <Spinner />
  }

  const hasBills = (
    <Fragment>
      <p className="lead"><i className="fas fa-wallet"></i> Wallet: $ {wallet.toFixed(2)} /{" "}
        <i className="fas fa-money-bill-wave"></i> *<i>$ {walletAfterPay.toFixed(2)}</i></p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> Pendent Bills: $ {totalToPay.toFixed(2)}</p>
      <hr className="my-4" />
      <p><i>*Wallet after paying pendent bills.</i></p>

      {/* trigger modal */}
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#pendentBills">
        Pendent Bills
      </button>
    </Fragment>
  );

  const allGood = (
    <Fragment>
      <p className="lead"><i className="fas fa-wallet"></i> Wallet: $ {wallet.toFixed(2)}</p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> No pendent bills, all good!</p>
      <hr className="my-4" />

      {/* trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#pendentBills">
        Payed Bills
      </button>
    </Fragment>
  )

  return (
    <div className="jumbotron">
      <h1 className="display-4"><i className="fas fa-user-circle"></i> User Account:</h1>

      {totalToPay === 0 ? allGood : hasBills}

      {/* modal */}
      <PendentModal pendentItems={itemsToPay[0]} />
      <NewBillModal />
    </div>
  );
};

Wallet.propTypes = {
  account: PropTypes.object.isRequired,
  loadBills: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, { loadBills })(Wallet);
