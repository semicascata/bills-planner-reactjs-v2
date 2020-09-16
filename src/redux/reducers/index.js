import { combineReducers } from 'redux';
import auth from './auth';
import account from './account';
import control from './control';

export default combineReducers({
  auth,
  account,
  control,
});