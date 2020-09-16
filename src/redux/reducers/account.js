import {
  BILLS_TO_PAY,
  PAYED_BILLS,
  PAY_BILLS,
  ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
  SET_AWAIT,
} from '../types';

const initialState = {
  wallet: null,
  walletAfterPay: null,
  totalToPay: null,
  itemsToPay: null,
  totalPayed: null,
  itemsPayed: null,
  accountError: null,
  wait: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AWAIT:
      return {
        ...state,
        wait: true,
      };
    case NEW_BILL:
      return {
        ...state,
        wait: false,
      };
    case BILLS_TO_PAY:
      console.log('BILLS_TO_PAY');
      return {
        ...state,
        wallet: action.payload.userWallet,
        walletAfterPay: action.payload.afterPayBills,
        totalToPay: action.payload.total,
        itemsToPay: [action.payload.items],
        wait: false,
      };
    case PAYED_BILLS:
      console.log('PAYED_BILLS');
      return {
        ...state,
        totalPayed: action.payload.total,
        itemsPayed: [action.payload.items],
        wait: false,
      };
    case PAY_BILLS:
      return {
        ...state,
        wait: false,
      };
    case ADD_CREDIT:
      return {
        ...state,
        wait: false,
      };
    case ACCOUNT_ERRORS:
      return {
        ...state,
        accountError: action.payload,
        wait: false,
      };
    default:
      return state;
  };
};