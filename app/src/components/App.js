import React, { Component } from 'react';
import Axios from 'axios';

import Container from '../components/Container';
import Auth from '../auth/Auth.js';
import {
  AppBar,
  IconButton,
  FlatButton,
} from 'material-ui';
import {
  NavigationClose,
} from 'material-ui/svg-icons/navigation/close';

class App extends Component {
  constructor(props) {
    super(props);
    this.authUser = this.authUser.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.state = {
      user : false,
      ref: setInterval(this.checkAuth, 10 * 1000),
    }
    this.checkAuth();
  }

  checkAuth() {
    Axios.get('/auth/me').then(res => {
      if (!res.data.error && res.data.user) {
        console.log('> auth: true')
        const { user } = res.data;
        this.setState({
          user,
        })
      } else {
        console.log('> auth: false')
        this.setState({
          user: false
        })
      }
    })
  }

  authUser(username, password) {
    Axios.post('/auth/token', {
      username: 'admin',
      password: 'admin'
    }).then(res => {
      const data = res.data || {}
      const { token } = data;
      if (token) {
      }
    }).catch(err => {
      console.log(err.message);
    })
    
  }

  logout() {
    Axios.get('/auth/logout')
    .then(() => {
      this.setState({
        user: false,
      })
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  render() {
    const { authUser, logout, state } = this;
    const { user } = state;
    const LoInOut = user? 'Logout' : 'Login';
    const SecureContent = user? usersPane({ user }) : Login({ authUser });

    return <div>
      <AppBar 
        title="Sample Auth"
        iconElementRight={<FlatButton onClick={logout} label={LoInOut} />}
      />
      <Container>
        {SecureContent}
      </Container>
    </div>
  }
}

export default App