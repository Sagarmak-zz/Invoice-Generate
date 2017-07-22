import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {

  login(email, password) {
    return HTTP.post('/login', {
      email: email,
      password: password
    });
  },

  userDetails() {
    return HTTP.get('/userDetails');
  },

}
