import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountInfo, setAwait } from '../../redux/actions/account';
import Spinner from '../layout/Spinner';
import PendentModal from './PendentModal';
import NewBillModal from './NewBillModal';
import AddCreditModal from './AddCreditModal';
import PayedBillsModal from './PayedBillsModal';

const Wallet = ({
  account: { wallet, name, join, payed, pendent, wait },
  accountInfo,
  setAwait,
}) => {
  useEffect(() => {
    setAwait();
    accountInfo();
  }, [setAwait, accountInfo]);

  if (wait || name === null) {
    return <Spinner />
  };

  // user info
  const nameToLowerCase = name.toLowerCase(); // username
  const userName = nameToLowerCase.replace(/^./, nameToLowerCase[0].toUpperCase()); // username
  const date = new Date(join); // join date
  const joinDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(); // join date

  // wallet after pay bills
  const walletAfterPay = wallet - pendent;

  const hasBills = (
    <Fragment>
      <p className="lead"><i className="fas fa-wallet"></i> Wallet: {
        wallet && wallet > 0 ? '$ ' + wallet.toFixed(2) : 'Add some credit!'
      } /{" "}
        <i className="fas fa-money-bill-wave"></i> *<i>{
          !walletAfterPay || walletAfterPay <= 0 ? 'Out of money!' : '$ ' + walletAfterPay.toFixed(2)
        }</i></p>
      <p className="lead"><i className="fas fa-money-bill"></i> Total Payed: {
        !payed || payed <= 0 ? 'Nothing payed yet...' : '$ ' + payed.toFixed(2)
      }</p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> Pendent Bills: {
        pendent ? '$ ' + pendent.toFixed(2) : null
      }</p>
      <hr className="my-4" />
      <p><i>*Wallet after paying pendent bills.</i></p>

      {/* trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addCredit">
        Add Credit
      </button>
      { payed ? <button type="button" className="btn btn-info" data-toggle="modal" data-target="#payedBills">
        Payed Bills
        </button> : null}
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
        !payed || payed <= 0 ? 'Nothing payed yet...' : '$ ' + payed.toFixed(2)
      }</p>
      <p className="lead"><i className="fas fa-hand-holding-usd"></i> No pendent bills, all good!</p>
      <hr className="my-4" />

      {/* trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newBill">
        New bill
      </button>
      <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addCredit">
        Add Credit
      </button>
      { payed ? <button type="button" className="btn btn-info" data-toggle="modal" data-target="#payedBills">
        Payed Bills
        </button> : null}
    </Fragment>
  )

  return (
    <div className="jumbotron">
      <h1 className="display-4">
        User Account:
      </h1>
      <h4><i className="fas fa-user-circle"></i> User: {userName} </h4>
      <h4>
        <i className="fas fa-calendar-day"></i> Joined in: {joinDate}
      </h4>
      <hr className="my-4" />
      {/* modal trigger */}
      {pendent === 0 ? allGood : hasBills}

      {/* modal */}
      <PendentModal />
      <NewBillModal />
      <AddCreditModal />
      <PayedBillsModal />
    </div>
  );
};

Wallet.propTypes = {
  account: PropTypes.object.isRequired,
  accountInfo: PropTypes.func.isRequired,
  setAwait: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, { accountInfo, setAwait })(Wallet);
