import axios from './index';
import Cookie from 'js-cookie'

export function login(username, password) {
  return axios.post('/auth', { username, password })
    .then(response => {
        Cookie.set('-token',response.data.access)
        return true;
    })
    .catch(error => {
      throw new Error('Falha ao realizar o login' + error);
    });
}

export default {
  login,
};
