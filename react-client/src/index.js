// import App from './components/app';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import Login from 'layouts/Login/Login.jsx';
import Signup from 'layouts/Signup/Signup.jsx';

import 'assets/css/material-dashboard-react.css';

import store from './store/index';

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route exact path='/' component= {Dashboard} />;
        <Route path='/login' component= {Login} />;
        <Route path='/signup' component= {Signup} />;
        <Route path='/dashboard' component= {Dashboard} />;
        <Route path='/device_profiles' component= {Dashboard} />;
        <Route path='/widgets' component= {Dashboard} />;
        <Route path='/map' component= {Dashboard} />;
        <Route path='/user' component= {Dashboard} />;
        
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
