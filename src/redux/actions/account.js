import {
  BILLS_TO_PAY,
  PAYED_BILLS,
  PAY_BILLS,
  ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
  SET_AWAIT
} from '../types';
import api from '../../utils/api';
import setToken from '../../utils/setToken';

// set wait to true
export const setAwait = () => {
  return {
    type: SET_AWAIT,
  };
};

// new bill
export const newBill = formData => async dispatch => {
  const token = localStorage.token;
  setToken(token);
  try {
    const res = await api.post('/account/userbill', {
      bill: +formData.bill,
      description: formData.description,
    });

    console.log(res.data);

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
export const loadBills = () => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    const res = await api.get('/account/needtopay');

    console.log(res.data);

    dispatch({
      type: BILLS_TO_PAY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);

    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

// get payed bills
export const payedBills = () => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    const res = await api.get('/account/payed');

    console.log(res.data);

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
  const token = localStorage.token;
  setToken(token);

  try {
    const res = await api.put('/account/userbill/commit');

    console.log(res.data);

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
  const token = localStorage.token;
  const stateParsed = JSON.parse(localStorage.state);
  const userId = stateParsed.auth.user._id;

  console.log(userId);
  setToken(token);

  try {
    const res = await api.put(`/users/wallet/${userId}`, ({
      credit: formData,
    }));
    console.log(res.data);

    dispatch({
      type: ADD_CREDIT,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};