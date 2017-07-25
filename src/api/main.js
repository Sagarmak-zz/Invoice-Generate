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

  //customer
  getCustomer() {
    return HTTP.get('/getCustomer');
  },

  createCustomer(name, person_name, email, gst_number,
    bill_address, bill_city, bill_state_code, bill_pincode, billing_mobile_number, billing_landline_number,
    ship_address, ship_city, ship_state_code, ship_pincode, shipping_mobile_number, shipping_landline_number) {
      // console.log(billing_mobile_number + '-' + billing_landline_number);
      // console.log(shipping_mobile_number + '-' + shipping_landline_number);
      return HTTP.post('/createCustomer', {
        name: name,
        person_name: person_name,
        email: email,
        gst_number: gst_number,
        bill_address: bill_address,
        bill_city: bill_city,
        bill_state_code: bill_state_code,
        bill_pincode: bill_pincode,
        billing_mobile_number: billing_mobile_number,
        billing_landline_number: billing_landline_number,
        ship_address: ship_address,
        ship_city: ship_city,
        ship_state_code: ship_state_code,
        ship_pincode: ship_pincode,
        shipping_mobile_number: shipping_mobile_number,
        shipping_landline_number: shipping_landline_number
      });
    },

    updateCustomer(cus_id, name, person_name, gst_number, email,
      bill_address, bill_city, bill_state_code, bill_pincode, billing_mobile_number, billing_landline_number,
      ship_address, ship_city, ship_state_code, ship_pincode, shipping_mobile_number, shipping_landline_number) {
      return HTTP.patch('/updateCustomer/' + cus_id, {
        name: name,
        person_name: person_name,
        gst_number: gst_number,
        email: email,
        bill_address: bill_address,
        bill_city: bill_city,
        bill_state_code: bill_state_code,
        bill_pincode: bill_pincode,
        billing_mobile_number: billing_mobile_number,
        billing_landline_number: billing_landline_number,
        ship_address: ship_address,
        ship_city: ship_city,
        ship_state_code: ship_state_code,
        ship_pincode: ship_pincode,
        shipping_mobile_number: shipping_mobile_number,
        shipping_landline_number: shipping_landline_number
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

    updateState(state_code, state_name) {
      let url = '/updateState' + state_code;
      return HTTP.patch(url, {
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
