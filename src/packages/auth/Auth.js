import jwt_decode from 'jwt-decode';

export default {
  //set token
  setToken(token) {
    window.localStorage.setItem('token', token);
  },
  //get token
  getToken() {
    var token = window.localStorage.getItem('token');
    if(!token) {
      return null
    }
    else {
      return token;
    }
  },
  getUserId() {
    return this.decodeToken(this.getToken()).sub;
  },
  isValidTokenValidTime() {
    return this.decodeToken(this.getToken()).exp > new Date().getTime() / 1000;
  },
  //destroy token
  destroyToken() {
    window.localStorage.removeItem('token')
  },
  //isAuthenticated
  isAuthenticated() {
    if(this.getToken()) {
      return true;
    }
    else {
      return false;
    }
  },
  decodeToken(token) {
    return jwt_decode( token );
  },
}
