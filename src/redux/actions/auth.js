import api from '../../utils/api';
import {
  LOAD_USER,
  AUTH_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  SET_LOADING,
  CLEAR_ERRORS,
  CHANGE_PASSWORD,
} from '../types';
import setToken from '../../utils/setToken';

// set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}

// load user
export const loadUser = () => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    const res = await api.get('/auth/profile');

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.response.data.message,
    });
  };
};

// register user
export const registerUser = (formData) => async dispatch => {
  try {
    const res = await api.post('/auth', formData);

    console.log(res.data.message);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    return 201;
  } catch (err) {
    const errData = err.response.status;
    console.log(errData);

    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.message,
    });

    return errData;
  }
};

// login user
export const loginUser = (formData) => async dispatch => {
  try {
    const res = await api.post('/auth/login', formData);

    const resStatus = res.data.status;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    return resStatus;
  } catch (err) {
    const errStatus = err.response.data.statusCode;
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message,
    });

    return errStatus;
  };
};

// logout
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};

// change password
export const changePassword = (credentials) => async dispatch => {
  const token = localStorage.token;
  setToken(token);

  try {
    await api.post('/auth/change-password', credentials);

    dispatch({
      type: CHANGE_PASSWORD,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERRORS,
      // payload: err.response.data.message,
    });
  }
};