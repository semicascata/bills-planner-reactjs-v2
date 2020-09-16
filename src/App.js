import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Wallet from './components/account/Wallet';
import ControlPanel from './components/controlPanel/ControlPanel';

// scss
import './assets/scss/styles.scss';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('[App] There is a token!');
    } else {
      console.log('[App] No token founded...');
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Register} />
              <PrivateRoute exact path='/account' component={Wallet} />
              <PrivateRoute exact path='/account/control' component={ControlPanel} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
