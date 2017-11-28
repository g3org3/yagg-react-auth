import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../ducks';
import {
  Link,
} from 'react-router-dom';

import {
  Drawer,
  MenuItem,
  AppBar,
} from 'material-ui';

const links = [
  { auth: true, to: '/me',      title: 'Profile'  },
  { auth: true, to: '/users',   title: 'Users'    },
  { auth: true, to: '/metrics', title: 'Metrics'  },
]

const Sidebar = (props) => (
  <Drawer 
    docked={false}
    width={300}
    open={props.open}
    onRequestChange={props.toggleSidebar}
  >
    <AppBar
      title="Menu"
      iconElementLeft={<span />}
    />
    {
      links.reduce((sum, link) => {
        if (!link.auth || (link.auth && props.user))
          sum.push(link);
        return sum;
      }, []).map(link => (
        <Link key={link.title} to={link.to}>
          <MenuItem onTouchTap={props.toggleSidebar}>{link.title}</MenuItem>
        </Link>
      ))
    }
    { props.user ? <MenuItem onTouchTap={props.logout}>Logout</MenuItem> : null }
  </Drawer>
);

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}

export default connect(state => {
  return {
    user: state.auth.user,
  }
}, (dispatch, ownprops) => {
  return {
    logout: () => {
      logoutAction()(dispatch);
      ownprops.toggleSidebar();
    },
  }
})(Sidebar);