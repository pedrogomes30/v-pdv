import axios from './index';
import TokenService from '../token'

export function login(username, password) {
  return axios.get(`/auth/${username}/${password}`)
    .then(response => {
      if(response.data.status == 'error'){
        throw new Error(response.data.data);
      }
      TokenService.setToken(response.data.data);
      return true;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export default {
  login,
};
