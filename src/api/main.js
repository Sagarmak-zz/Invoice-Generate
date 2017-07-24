import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {

  login(email, password) {
    return HTTP.post('/login', {
      email: email,
      password: password
    });
  },

  //admin Details
  userDetails() {
    return HTTP.get('/userDetails');
  },

  updateUserDetails(user_id, username, email, name, gst_number, address, city_name, state_code, pincode, mobile_number, landline_number) {
    let url = '/userDetails/' + user_id;
    return HTTP.patch(url, {
      username: username,
      email: email,
      name: name,
      gst_number: gst_number,
      address: address,
      city_name: city_name,
      state_code: state_code,
      pincode: pincode,
      mobile_number: mobile_number,
      landline_number: landline_number
    });
  },

  //states
  getState() {
    return HTTP.get('/getStates');
  },

  addState(state_code, state_name) {
    return HTTP.post('/addState', {
      state_code: state_code,
      state_name: state_name
    })
  },

  deleteState(state_code) {
    console.log(state_code);
    // /deleteState/{state_code}
    return HTTP.delete('/deleteState/' + state_code);
  }

}
