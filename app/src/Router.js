
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Components and Pages
import Layout from './components/Layout'
import Login from './routes/Login'
import PrivateRoute from './auth/Auth'
import Metrics from './routes/Metrics'

const User = (props) => (<div><h1>{props.name}</h1></div>);
const NotFound = () => <Redirect to="/user" />;

export default (props) => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/user" component={User.bind(null, {name: 'User'})} />
        <PrivateRoute path="/me" component={User.bind(null, { name: 'Admin/Admin'})} />
        <PrivateRoute path="/metrics" component={Metrics} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);
