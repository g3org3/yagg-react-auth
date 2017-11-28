import axios from 'axios';
import Promise from 'bluebird';
import * as DB from '../utils/db';

export const AUTH_USER = 'auth-auth_user';
export const LOGOUT = 'auth-logout_user';
export const GET_USER_PROFILE = 'auth-get_user_profile';
export const ERROR = 'error';
export const REQUEST_IN_PROGRESS = 'auth-in-progress'

export const AUTH_SERVER_URL = process.env.NODE_APP === 'development' ? 'http://localhost:1337' : 'http://auth.jorgeadolfo.com';

export default function reducer(state={
    user: false,
    fetching: false,
    fetched: false,
    token: false,
    error: null,
    message: false,
    messageKey: false,
  }, action) {

  switch (action.type) {
    case REQUEST_IN_PROGRESS: {
      return {
        ...state,
        fetching: true,
      }
    }
    case AUTH_USER: {
      return {
        ...state,
        fetching: false,
        token: action.payload
      }
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        fetching: false,
        user: action.payload
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: false
      }
    }
    case ERROR: {
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        messageKey: action.payload.messageKey,
      }
    }
    default: {
      return state;
    }
  }
}

export const getUserProfileAction = () => {
  return function (dispatch) {
    dispatch({ type: REQUEST_IN_PROGRESS });
    const token = DB.get('uinfo')
    return axios.get(`${AUTH_SERVER_URL}/auth/me?token=${token}`).then(res => {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user
      })
    })
    .catch(err => {
      return dispatch({
        type: ERROR,
        err: err,
        payload: {
          message: 'Could not get user profile',
          reducer: 'Auth'
        }
      });
    })
  }
}

export const authenticateUserAction = (username, password) => (
  (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: REQUEST_IN_PROGRESS });
    axios.post(AUTH_SERVER_URL+'/auth/token', { username, password }).then(res => {
      DB.set('uinfo', res.data.token);
      dispatch({
        type: AUTH_USER,
        payload: res.data.token
      });
      return resolve(true);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        err: err,
        payload: {
          messageKey: 'login.error',
          reducer: 'auth'
        }
      });
      return reject(err);
    })
  })
)

export const logoutAction = () => dispatch => {
  DB.set('uinfo', '')
  axios.get(AUTH_SERVER_URL+'/auth/logout').then(res => {
    dispatch({
      type: LOGOUT
    })
  })
  .catch(err => {
    dispatch({
      type: ERROR,
      err: err,
      payload: {
        message: 'could not logout user',
        reducer: 'auth'
      }
    });
  })
}