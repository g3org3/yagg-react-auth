
import axios from 'axios';
import * as DB from './db'
import { AUTH_SERVER_URL } from '../ducks'

export function get(endpoint) {
  const token = DB.get('uinfo')
  const url = `${AUTH_SERVER_URL}${endpoint}?token=${token}`
  return axios.get(url, { timeout: 3000 })
}