import axios from './index';
import TokenService from '../token'

export function login(username, password) {
  return axios.get(`/auth/${username}/${password}`)
    .then(response => {
      TokenService.setToken(response.data.data.access);
      return true;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export default {
  login,
};
