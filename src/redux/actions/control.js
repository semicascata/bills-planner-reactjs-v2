import {
  GET_USERS,
  DELETE_USER,
  CONTROL_ERRORS
} from '../types';
import api from '../../utils/api';
import setToken from '../../utils/setToken';

// fetch users
export const fetchUsers = () => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    const res = await api.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTROL_ERRORS,
      payload: err.response.data.message,
    })
  }
};

// delete user
export const deleteUser = (id) => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    await api.delete(`/users/${id}`);

    dispatch({
      type: DELETE_USER,
    });
  } catch (err) {
    dispatch({
      type: CONTROL_ERRORS,
      payload: err.response.data.message,
    });
  };
};