import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBills, payedBills } from '../../redux/actions/account';
import Spinner from '../layout/Spinner';
import PendentModal from './PendentModal';
import NewBillModal from './NewBillModal';
import AddCreditModal from './AddCreditModal';
import PayedBillsModal from './PayedBillsModal';

const Wallet = ({
  account: { wallet, walletAfterPay, totalToPay, itemsToPay, itemsPayed, totalPayed },
  loadBills,
  payedBills,
}) => {
  useEffect(() => {
    setTimeout(() => {
      loadBills();
      payedBills();
    }, 1000);
  }, [loadBills, payedBills]);

  if (!wallet && !totalPayed && !totalToPay && walletAfterPay === undefined) {
    return <Spinner />
  };

  const hasBills = (
    <Fragment>
      <p className="lead"><i className="fas fa-wallet"></i> Wallet: {
        wallet && wallet > 0 ? '$ ' + wallet.toFixed(2) : 'Add some credit!'
      } /{" "}
        <i className="fas fa-money-bill-wave"></i> *<i>{
          !walletAfterPay || walletAfterPay <= 0 ? 'Out of money!' : '$ ' + walletAfterPay.toFixed(2)
        }</i></p>
      <p className="lead"><i className="fas fa-money-bill"></i> Total Payed: {
        !totalPayed || totalPayed <= 0 ? 'Nothing payed yet...' : '$ ' + totalPayed.toFixed(2)
      }</p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> Pendent Bills: {
        totalToPay ? '$ ' + totalToPay.toFixed(2) : null
      }</p>
      <hr className="my-4" />
      <p><i>*Wallet after paying pendent bills.</i></p>

      {/* trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-info" data-toggle="modal" data-target="#payedBills">
        Payed Bills
      </button>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addCredit">
        Add Credit
      </button>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#pendentBills">
        Pendent Bills
      </button>
    </Fragment>
  );

  const allGood = (
    <Fragment>
      <p className="lead"><i className="fas fa-wallet"></i> Wallet: {
        wallet && wallet > 0 ? '$ ' + wallet.toFixed(2) : 'Add some credit!'
      }</p>
      <p className="lead"><i className="fas fa-money-bill"></i> Total Payed: {
        !totalPayed || totalPayed <= 0 ? 'Nothing payed yet...' : '$ ' + totalPayed.toFixed(2)
      }</p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> No pendent bills, all good!</p>
      <hr className="my-4" />

      {/* trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-info" data-toggle="modal" data-target="#payedBills">
        Payed Bills
      </button>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addCredit">
        Add Credit
      </button>
    </Fragment>
  )

  return (
    <div className="jumbotron">
      <h1 className="display-4"><i className="fas fa-user-circle"></i> User Account:</h1>

      {totalToPay === 0 ? allGood : hasBills}

      {/* modal */}
      {itemsToPay && itemsToPay[0].length > 0 ? <PendentModal pendentItems={itemsToPay[0]} /> : null}
      <NewBillModal />
      <AddCreditModal />
      {itemsPayed && itemsPayed[0].length > 0 ? <PayedBillsModal payedItems={itemsPayed[0]} /> : null}
    </div>
  );
};

Wallet.propTypes = {
  account: PropTypes.object.isRequired,
  loadBills: PropTypes.func.isRequired,
  payedBills: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, { loadBills, payedBills })(Wallet);
