export default {
  //set token
  setToken(token) {
    window.localStorage.setItem('token', token);
  },
  //get token
  getToken() {
    return window.localStorage.getItem('token');
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
