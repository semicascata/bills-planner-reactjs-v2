import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();

const middleware = [thunk];

const store = createStore(
  rootReducer,
  persistedState, // state persistence
  composeWithDevTools(applyMiddleware(...middleware))
);

// persistence
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;