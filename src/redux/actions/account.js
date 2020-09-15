import {
  BILLS_TO_PAY,
  // PAYED_BILLS,
  PAY_BILLS,
  // ADD_CREDIT,
  ACCOUNT_ERRORS,
  NEW_BILL,
} from '../types';
import api from '../../utils/api';
import setToken from '../../utils/setToken';

// new bill
export const newBill = formData => async dispatch => {
  const token = localStorage.token;
  setToken(token);
  try {
    console.log(formData);

    const res = await api.post('/account/userbill', formData);

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
    console.log(err);

    dispatch({
      type: ACCOUNT_ERRORS,
      payload: err.response.data,
    });
  }
};

// get payed bills
export const payedBills = () => async dispatch => {

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
export const addCredit = () => async dispatch => {

};