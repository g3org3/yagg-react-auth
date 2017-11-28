// deps
import React from 'react';
import { connect } from 'react-redux';
import { authenticateUserAction, getUserProfileAction } from '../ducks';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

// Internal Components
import Row from '../components/Row';
// import Debug from '../components/debug';

import {
  TextField,
  RaisedButton,
} from 'material-ui';

const Login = (props) => {
  const nextRoute = decodeURIComponent(props.location.search.substr('?returnUrl='.length));
  if (props.user) {
    return <Redirect to={nextRoute} />;
  }
  return <div className="col-lg-6 col-lg-offset-3">
      <h1><FormattedMessage id='login.title' /></h1>
      <form onSubmit={props.authenticateUser}>
        <Row>
          <TextField
            id="login-username"
            hintText={<FormattedMessage id='login.email.placeholder' />}
            floatingLabelText={<FormattedMessage id='login.email.label' />}
            disabled={props.fetching}
            fullWidth={true}
          />
        </Row>
        <Row>
            <TextField
            id="login-password"
            hintText="Password"
            floatingLabelText={<FormattedMessage id='login.password' />}
            type="password"
            disabled={props.fetching}
            fullWidth={true}
          />
        </Row>
        <Row>
          <br />
          <RaisedButton
            primary={true}
            label={<FormattedMessage id='login.submit' />}
            type="submit"
            disabled={props.fetching}
            onClick={props.authenticateUser}
          />
        </Row>
        <Row>
          <br />
          { props.messageKey? <FormattedMessage id={props.messageKey} />: null }
        </Row>
      </form>
  </div>
};

export default connect(state => {
  return {
    user: state.auth.user,
    message: state.auth.message,
    fetching: state.auth.fetching,
    messageKey: state.auth.messageKey
  }
}, dispatch => {
  return {
    authenticateUser: (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      authenticateUserAction(username, password)(dispatch).then(() => {
        return getUserProfileAction()(dispatch);
      }).catch(err => {})
      
      return false;
    }
  }
})(Login);