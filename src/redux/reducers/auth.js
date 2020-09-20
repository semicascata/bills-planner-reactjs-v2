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
  TOKEN,
} from '../types';

const initialState = {
  user: null,
  error: null,
  isAuth: null,
  loading: false,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        isAuth: true,
        loading: false,
      }
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AUTH_ERRORS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('state');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      return {
        ...state,
        token: null,
        refreshToken: null,
        isAuth: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}