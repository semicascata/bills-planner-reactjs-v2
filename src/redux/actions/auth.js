import api from '../../utils/api';
import setToken from '../../utils/setToken';
import {
  LOAD_USER,
  AUTH_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  SET_LOADING,
  CLEAR_ERRORS
} from '../types';

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

    console.log(res);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
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

    const resStatus = res.status;
    console.log(resStatus);

    dispatch({
      type: REGISTER_SUCCESS,
    });

    return resStatus;
  } catch (err) {
    const errStatus = err.response.data.statusCode;
    // console.log(errStatus);

    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.message,
    });

    return errStatus;
  }
};

// login user
export const loginUser = (formData) => async dispatch => {
  try {
    const res = await api.post('/auth/login', formData);

    const resStatus = await res.data.status;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // loadUser();
    return resStatus;
  } catch (err) {
    console.log(err);
    const errStatus = await err.response.data.statusCode;

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