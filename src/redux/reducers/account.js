import {
  BILLS_TO_PAY,
  PAYED_BILLS,
  PAY_BILLS,
  ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
} from '../types';

const initialState = {
  wallet: null,
  walletAfterPay: null,
  totalToPay: null,
  itemsToPay: null,
  totalPayed: null,
  itemsPayed: null,
  accountError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_BILL:
      return {
        ...state,
      };
    case BILLS_TO_PAY:
      console.log('BILLS_TO_PAY');
      return {
        ...state,
        wallet: action.payload.userWallet,
        walletAfterPay: action.payload.afterPayBills,
        totalToPay: action.payload.total,
        itemsToPay: [action.payload.items]
      };
    case PAYED_BILLS:
      return {};
    case PAY_BILLS:
      return {
        ...state,
      };
    case ADD_CREDIT:
      return {};
    case ACCOUNT_ERRORS:
      return {
        ...state,
        accountError: action.payload,
      };
    default:
      return state;
  };
};