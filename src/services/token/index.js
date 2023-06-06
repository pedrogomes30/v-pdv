import Cookie from 'js-cookie';
import router from '../../router';

const TokenService = {
  getToken() {
    const token = Cookie.get('_token');
    if (!token || !this.isValid(token)) {
      router.push('/login');
      return false;
    }
    return token;
  },

  async setToken(token) {
    await Cookie.set('_token', token);
  },

  removeToken() {
    Cookie.remove('_token');
    router.push('/login');
  },

  isValid(token) {
    if (!token) {
      return false;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }

    const payload = tokenParts[1];
    const decodedPayload = atob(payload);
    try {
      const payloadData = JSON.parse(decodedPayload);
      const currentTime = Math.floor(Date.now() / 1000);
      if (payloadData.expires && payloadData.expires < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default TokenService;
