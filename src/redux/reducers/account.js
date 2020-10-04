import {
  BILLS_TO_PAY,
  PAYED_BILLS,
  PAY_BILLS,
  ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
  SET_AWAIT,
  DELETE_BILL,
  CHANGE_CREDITED,
  LOAD_ACCOUNT,
  CLEAR_ITEMS,
  FIX_WALLET,
} from '../types';

const initialState = {
  // account info
  wallet: null,
  name: null,
  join: null,
  payed: null,
  pItems: null,
  pendent: null,
  pndItems: null,

  // modal
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
    case LOAD_ACCOUNT:
      return {
        ...state,
        wallet: action.payload.wallet,
        name: action.payload.user,
        join: action.payload.joined,
        payed: action.payload.totalPayed,
        pItems: action.payload.payedItems,
        pendent: action.payload.totalPendent,
        pndItems: action.payload.pendentItems,
        wait: false,
      }
    case NEW_BILL:
      return {
        ...state,
        wait: false,
      };
    case BILLS_TO_PAY:
      return {
        ...state,
        wallet: action.payload.userWallet,
        walletAfterPay: action.payload.afterPayBills,
        totalToPay: action.payload.total,
        itemsToPay: [action.payload.items],
        wait: false,
      };
    case PAYED_BILLS:
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
    case FIX_WALLET:
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
    case CHANGE_CREDITED:
      return {
        ...state,
        wait: false,
      };
    case DELETE_BILL:
      return {
        ...state,
        wait: false,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        itemsToPay: null,
        itemsPayed: null,
      }
    default:
      return state;
  };
};