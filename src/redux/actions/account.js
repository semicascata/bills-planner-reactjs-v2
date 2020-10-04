import {
  LOAD_ACCOUNT,
  BILLS_TO_PAY,
  PAYED_BILLS,
  PAY_BILLS,
  ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
  SET_AWAIT,
  DELETE_BILL,
  CHANGE_CREDITED,
  CLEAR_ITEMS,
  FIX_WALLET,
} from '../types';
import api from '../../utils/api';
// import setToken from '../../utils/setToken';

// set wait to true
export const setAwait = () => {
  return {
    type: SET_AWAIT,
  };
};

// account info
export const accountInfo = () => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    const res = await api.get('/account/userinfo');

    dispatch({
      type: LOAD_ACCOUNT,
      payload: res.data,
    })

  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data.message,
    });
  }
};

// new bill
export const newBill = formData => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    await api.post('/account/userbill', {
      bill: +formData.bill,
      description: formData.description,
    });

    dispatch({
      type: NEW_BILL,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data.message,
    });
  };
};

// get bills to pay
export const loadBills = (date) => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    const res = await api.get(`/account/needtopay/${date}`);

    dispatch({
      type: BILLS_TO_PAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

// get payed bills
export const payedBills = (date) => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    const res = await api.get(`/account/payed/${date}`);

    dispatch({
      type: PAYED_BILLS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  };
};

// pay all bills
export const payBills = () => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    await api.put('/account/userbill/commit');

    dispatch({
      type: PAY_BILLS,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  };
};

// add credit to wallet
export const addCredit = (formData) => async dispatch => {
  // const token = localStorage.token;
  const stateParsed = JSON.parse(localStorage.state);
  const userId = stateParsed.auth.user._id;

  // setToken(token);

  try {
    await api.put(`/users/wallet/${userId}`, ({
      credit: formData,
    }));

    dispatch({
      type: ADD_CREDIT,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

// fix wallet
export const fixWallet = (value) => async dispatch => {
  try {
    await api.put('/users/wallet/change/value', ({
      credit: value,
    }));

    dispatch({
      type: FIX_WALLET,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

export const changeCredited = (id) => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    await api.put(`account/credited/${id}`);

    dispatch({
      type: CHANGE_CREDITED,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteBill = (id) => async dispatch => {
  // const token = localStorage.token;
  // setToken(token);

  try {
    await api.delete(`account/${id}`);

    dispatch({
      type: DELETE_BILL,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

export const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
  }
};