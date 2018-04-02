import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {
  login(email, password) {
    return HTTP.post("/login", {
      email: email,
      password: password
    });
  },

  //1 dashboard

  //2 bill
  createBill(
    user_id,
    firm_id,
    invoice_no,
    invoiceYear,
    taxable_amount,
    sgst_percentage,
    sgst_amount,
    cgst_percentage,
    cgst_amount,
    igst_percentage,
    igst_amount,
    total_payable_amount,
    created_at,
    bill_detail
  ) {
    return HTTP.post("/createBill", {
      user_id: user_id,
      firm_id: firm_id,
      invoice_no: invoice_no,
      invoiceYear: invoiceYear,
      taxable_amount: taxable_amount,
      sgst_percentage: sgst_percentage,
      sgst_amount: sgst_amount,
      cgst_percentage: cgst_percentage,
      cgst_amount: cgst_amount,
      igst_percentage: igst_percentage,
      igst_amount: igst_amount,
      total_payable_amount: total_payable_amount,
      created_at: created_at,
      bill_detail: bill_detail
    });
  },

  deleteBill(bill_id) {
    return HTTP.delete("/deleteBill/" + bill_id);
  },

  checkInvoice(invoice_no, fiscal_year) {
    return HTTP.get("/checkInvoice/" + invoice_no + "/" + fiscal_year);
  },

  //3 chalan



  //4 user
  getCustomer() {
    return HTTP.get("/getCustomer");
  },

  createCustomer(
    name,
    person_name,
    email,
    gst_number,
    billing_address,
    billing_city,
    billing_state_code,
    billing_pincode,
    billing_mobile_number,
    billing_landline_number,
    shipping_address,
    shipping_city,
    shipping_state_code,
    shipping_pincode,
    shipping_mobile_number,
    shipping_landline_number
  ) {
    return HTTP.post("/createCustomer", {
      name: name,
      person_name: person_name,
      email: email,
      gst_number: gst_number,
      billing_address: billing_address,
      billing_city: billing_city,
      billing_state_code: billing_state_code,
      billing_pincode: billing_pincode,
      billing_mobile_number: billing_mobile_number,
      billing_landline_number: billing_landline_number,
      shipping_address: shipping_address,
      shipping_city: shipping_city,
      shipping_state_code: shipping_state_code,
      shipping_pincode: shipping_pincode,
      shipping_mobile_number: shipping_mobile_number,
      shipping_landline_number: shipping_landline_number
    });
  },

  updateCustomer(
    cus_id,
    name,
    person_name,
    gst_number,
    email,
    billing_address,
    billing_city,
    billing_state_code,
    billing_pincode,
    billing_mobile_number,
    billing_landline_number,
    shipping_address,
    shipping_city,
    shipping_state_code,
    shipping_pincode,
    shipping_mobile_number,
    shipping_landline_number
  ) {
    return HTTP.patch("/updateCustomer/" + cus_id, {
      name: name,
      person_name: person_name,
      gst_number: gst_number,
      email: email,
      billing_address: billing_address,
      billing_city: billing_city,
      billing_state_code: billing_state_code,
      billing_pincode: billing_pincode,
      billing_mobile_number: billing_mobile_number,
      billing_landline_number: billing_landline_number,
      shipping_address: shipping_address,
      shipping_city: shipping_city,
      shipping_state_code: shipping_state_code,
      shipping_pincode: shipping_pincode,
      shipping_mobile_number: shipping_mobile_number,
      shipping_landline_number: shipping_landline_number
    });
  },

  listCustomer() {
    return HTTP.get("/listCustomer");
  },


  //5 product
  addProduct(product_name, hsn_code, product_price) {
    return HTTP.post("/addProduct", {
      product_name: product_name,
      hsn_code: hsn_code,
      product_price: product_price
    });
  },

  getProducts() {
    return HTTP.get("/getProducts");
  },

  updateProduct(product_id, product_name, hsn_code, product_price) {
    return HTTP.patch("/updateProduct/" + product_id, {
      product_name: product_name,
      hsn_code: hsn_code,
      product_price: product_price
    });
  },

  //6 history page
  getAllBills() {
    return HTTP.get("/getBills");
  },

  getBillsByYear(fiscal_year) {
    return HTTP.get("/getBills/" + fiscal_year);
  },

  getBillByInvoiceNo(invoice_no, fiscalYear) {
    // /getBill/1/2018-19
    let url = "/getBill/" + invoice_no + "/" + fiscalYear
    return HTTP.get(url);
  },

  getLastBill() {
    return HTTP.get("/invoiceNumber");
  },

  //7 report
  betweenDate(start_date, end_date) {
    return HTTP.post("/betweenDate", {
      start_date: start_date,
      end_date: end_date
    });
  },

  //8 settings
  //admin Details
  userDetails() {
    return HTTP.get("/userDetails");
  },

  createAdminUser(name, email, password) {
    let url = "/userDetails/create";
    return HTTP.post(url, {
      name: name,
      email: email,
      password: password
    });
  },

  updateUserDetails(
    user_id,
    username,
    email,
    name,
    gst_number,
    address,
    cityname,
    state_code,
    pincode,
    mobile_number,
    landline_number,
    bank_name,
    branch_name,
    ifsc_code,
    account_no
  ) {
    let url = "/userDetails/" + user_id;
    return HTTP.patch(url, {
      username: username,
      email: email,
      name: name,
      gst_number: gst_number,
      address: address,
      cityname: cityname,
      state_code: state_code,
      pincode: pincode,
      mobile_number: mobile_number,
      landline_number: landline_number,
      bank_name: bank_name,
      branch_name: branch_name,
      ifsc_code: ifsc_code,
      account_no: account_no
    });
  },

  updateAdminPassword(password) {
    console.log(password);
    let url = "/userDetail/updatePassword";
    return HTTP.patch(url, {
      password: password
    });
  },

  //states
  getState() {
    return HTTP.get("/getStates");
  },

  addState(state_code, state_name) {
    return HTTP.post("/addState", {
      state_code: state_code,
      state_name: state_name
    });
  },

  updateState(state_code, state_name) {
    let url = "/updateState" + state_code;
    return HTTP.patch(url, {
      state_code: state_code,
      state_name: state_name
    });
  },

  deleteState(state_code) {
    // /deleteState/{state_code}
    return HTTP.delete("/deleteState/" + state_code);
  },
};
