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
  }
}
