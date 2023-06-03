import axios from './index';
import Cookie from 'js-cookie'

export function login(username, password) {
  return axios.get('/auth', { username, password })
    .then(response => {
      console.log('RESPONSE',response)
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
