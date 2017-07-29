<template lang="html">
  <div class="add-user">
    <div class="box">
      <div class="head-user">
        <h3 class="title">Users</h3>
        <button class="button is-primary is-pulled-right" v-if="!showAddUserModal" @click="showAddUserModal = true">Add</button>
        <button class="button" v-if="showAddUserModal" @click="showAddUserModal = false">Hide</button>
      </div>
      <!-- <AddUserModal @close="showAddUserModal = false" v-if="showAddUserModal"></AddUserModal> -->
      <div v-if="showAddUserModal">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Firm Name</label>
              <p class="control">
                <input v-model="firm_name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Name">
              </p>
              <div v-show="errors.has('firm_name')" class="help is-danger">
                The Firm Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Contact Person Name</label>
              <p class="control">
                <input v-model="contact_person_name" class="input" name="cp_name" v-validate="'required'" type="email" placeholder="Contact Person Name">
              </p>
              <div v-show="errors.has('cp_name')" class="help is-danger">
                The Contact Person Name is required.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column gst">
            <div class="field">
              <label class="label">GST Number</label>
              <p class="control">
                <input v-model="gst_no" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
              </p>
              <div v-show="errors.has('gst_no')" class="help is-danger">
                The GST Number is required.
              </div>
            </div>
          </div>
          <div class="column email">
            <div class="field">
              <label class="label">Email</label>
              <p class="control">
                <input v-model="email" name="billemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billemail')">
                The Email is required and should be a valid Email address.
              </div>
            </div>
          </div>
        </div>

        <h3 class="title billing">Billing Address</h3>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Address</label>
              <p class="control">
                <textarea v-model="billing.address" name="billaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
              </p>
              <div v-show="errors.has('billaddress')" class="help is-danger">
                The Billing Address is a required field..
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Contact No(Mobile)</label>
              <p class="control">
                <input v-model="billing.mobile" name="billmobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billmobile_no')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
            <div class="field">
              <label class="label">Contact No(Landline)</label>
              <p class="control">
                <input v-model="billing.landline" name="billlandline_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billlandline_no')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">City</label>
              <p class="control">
                <input v-model="billing.city" class="input" name="billcity" v-validate="'required'" type="text" placeholder="City">
              </p>
              <div v-show="errors.has('billcity')" class="help is-danger">
                The City Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">State</label>
              <p class="control">
                <!-- <input v-model="billing.state" class="input" name="billstate" v-validate="'required'" type="text" placeholder="State Dropdown"> -->
                <StateDropdownNewCustomer1></StateDropdownNewCustomer1>
              </p>
              <div v-show="errors.has('billstate')" class="help is-danger">
                The State is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Pincode</label>
              <p class="control">
                <input v-model="billing.pincode" name="billpincode" v-validate="'required'" type="number" placeholder="Pincode" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billpincode')">
                The Pincode is required.
              </div>
            </div>
          </div>
        </div>

        <div class="shipping address">
          <h3 class="title">Shipping Address</h3>
          <button class="button is-primary" @click="same">Same as Above</button>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Address Line 1</label>
              <p class="control">
                <textarea v-model="shipping.address" name="shipaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
              </p>
              <div v-show="errors.has('shipaddress')" class="help is-danger">
                The Temporary Address is a required field with minimum of 10 letters.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Contact No(Mobile)</label>
              <p class="control">
                <input v-model="shipping.mobile" name="shipmobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('shipmobile_no')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
            <div class="field">
              <label class="label">Contact No(Landline)</label>
              <p class="control">
                <input v-model="shipping.landline" name="shiplandline_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('shiplandline_no')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">City</label>
              <p class="control">
                <input v-model="shipping.city" class="input" name="shipcity" v-validate="'required'" type="text" placeholder="City">
              </p>
              <div v-show="errors.has('shipcity')" class="help is-danger">
                The City Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">State</label>
              <p class="control">
                <!-- <input v-model="shipping.state" class="input" name="shipstate" v-validate="'required'" type="text" placeholder="State Dropdown"> -->
                <StateDropdownNewCustomer2></StateDropdownNewCustomer2>
              </p>
              <div v-show="errors.has('shipstate')" class="help is-danger">
                The State is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Pincode</label>
              <p class="control">
                <input v-model="shipping.pincode" name="shippincode" v-validate="'required'" type="number" placeholder="Pincode" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('shippincode')">
                The Email is required and should be a valid Email address.
              </div>
            </div>
          </div>
        </div>
        <div class="button-form">
          <a @click="validateAndAddCustomer()" class="button is-primary">Save</a>
        </div>
      </div>

      <div class="reports" v-if="!noData">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="user-head">
                <h4 class="title">Customers List</h4>
                <span>Total Customers: <b>{{customers.length}}</b></span>
              </div>
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>Firm Name</th>
                      <th>Contact Person Name</th>
                      <th>GST</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Mobile No-Landline No</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="customer in customers">
                      <td>{{customer.name}}</td>
                      <td>{{customer.person_name}}</td>
                      <td>{{customer.gst_number}}</td>
                      <td>{{customer.email}}</td>
                      <td>{{customer.billing_address}}</td>
                      <td> {{customer.billing_mobile_number}} - {{customer.billing_landline_number}} </td>
                      <td>
                        <a class="icon">
                          <EditCustomerDetailsModal :key="customer.id" :customer="customer"></EditCustomerDetailsModal>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="noData" v-if="noData">
        <h1 class="title">No Data at the Moment.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import AddUserModal from '@/components/AddUserModal';
import StateDropdownNewCustomer1 from '@/components/StateDropdownNewCustomer1';
import StateDropdownNewCustomer2 from '@/components/StateDropdownNewCustomer2';
import EditCustomerDetailsModal from '@/components/EditCustomerDetailsModal';
export default {
  name: 'add-user',
  components: {
    AddUserModal,
    StateDropdownNewCustomer1,
    StateDropdownNewCustomer2,
    EditCustomerDetailsModal
  },
  created() {
    this.$bus.$on('state-new-change1', (data) => {
      this.billing.state_code = data.state_id;
    });
    this.$bus.$on('state-new-change2', (data) => {
      this.shipping.state_code = data.state_id;
    });
    this.getCustomer();
  },
  data() {
    return {
      showAddUserModal: false,
      editCustomerDetailsModal: false,
      cusID: null,
      firm_name: '',
      contact_person_name: '',
      gst_no: '',
      email: '',
      billing: {
        address: '',
        city: '',
        state_code: null,
        pincode: '',
        mobile: null,
        landline: null,
      },
      shipping: {
        address: '',
        city: '',
        state_code: null,
        pincode: '',
        mobile: null,
        landline: null,
      },
      checkbox: '',
      customers: [],
      noData: false
    };
  },
  methods: {
    getCustomer() {
      api.getCustomer()
      .then((response) => {
        if(response.data.message == "No data found") {
          this.noData = true;
        }
        else {
          this.customers = response.data.Firms;
          this.noData = false;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    validateAndAddCustomer() {
      this.validate()
      if (!this.errors.any()) {
        if(this.dataIsHere == false) {
          let toast = this.$toasted.error('Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else {
          this.submitCustomer();
        }
      }
      else {
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
      }
    },
    submitCustomer() {
      api.createCustomer(this.firm_name, this.contact_person_name, this.email, this.gst_no,
        this.billing.address, this.billing.city, this.billing.state_code, this.billing.pincode, this.billing.mobile, this.billing.landline,
        this.shipping.address, this.shipping.city, this.shipping.state_code, this.shipping.pincode, this.shipping.mobile, this.shipping.landline)
        .then((response) => {
          if(response.status == 200) {
            this.getCustomer();
            let toast = this.$toasted.success("Customer Added Successfully!", {
              theme: "outline",
              position: "top-center",
              duration : 3000
            });
            this.showAddUserModal = false;
          }
        })
        .catch((error) => {
          console.log(error);
          let toast = this.$toasted.error(error.response.data.message, {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        })
      },
      validate() {
        return this.$validator.validateAll();
      },
      same() {
        this.shipping.address = this.billing.address;
        this.shipping.mobile = this.billing.mobile;
        this.shipping.landline = this.billing.landline;
        this.shipping.city = this.billing.city;
        this.shipping.state_code = this.billing.state_code;
        this.$bus.$emit('state-change', {state: this.shipping.state_code});
        this.shipping.pincode = this.billing.pincode;
      },
    },
  }
  </script>

  <style lang="scss">
  .add-user {
    .head-user {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px #ddd;
      .title {
        margin: 0;
      }
    }
    .reports {
      // important
      // border-top: solid 1px #ddd;
      padding: 1rem;
      overflow-x:scroll;
      table-layout: inherit;
    }

    .column.gst {
      padding-top: 0;
    }
    .column.email {
      padding-top: 0;
    }
    .title.billing {
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding-left: 1.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0;
      background: whitesmoke;
    }
    .shipping {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding-left: 1.5rem;
      padding-right: 1.6rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      background: whitesmoke;
      .title {
        margin: 0;
      }
    }

    .tile.is-parent {
      padding-bottom: 0;
    }

    .columns {
      margin: 0;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .modal-head {
      padding-bottom: 1rem;
      border-bottom: solid 1px #ddd;
    }
    .modal-card {
      width: 1000px;
    }
    .modal-card-foot {
      display: flex;
      justify-content: space-between;
    }

    .box {
      padding: 0;
    }

    .button-form {
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding: 1rem;
      padding-left: 1.7rem;
    }

    .user-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .title {
        margin: 0;
      }
    }

    .noData {
      padding: 1rem;
    }

  }
  </style>
