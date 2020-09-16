import {
  GET_USERS,
  DELETE_USER,
  CONTROL_ERRORS
} from '../types';

const initialState = {
  users: null,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
      }
    case CONTROL_ERRORS:
      return {
        ...state,
        errors: action.payload,
      }
    default:
      return state;
  }
}