<template lang="html">
  <div class="admin-update-modal">

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Details</p>
          <button class="delete" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">
          <div class="form">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Admin Name</label>
                  <p class="control">
                    <input v-model="admin_name = data.username" class="input" name="admin_name" v-validate="'required'" type="text" placeholder="Admin Name">
                  </p>
                  <div v-show="errors.has('admin_name')" class="help is-danger">
                    The Admin Name is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Firm Name</label>
                  <p class="control">
                    <input v-model="firm_name = data.firm_name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Firm Name">
                  </p>
                  <div v-show="errors.has('firm_name')" class="help is-danger">
                    The Firm Name is required.
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">GST Number</label>
                  <p class="control">
                    <input v-model="gst_no = data.gst_number" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
                  </p>
                  <div v-show="errors.has('gst_no')" class="help is-danger">
                    The GST Number is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <p class="control">
                    <input v-model="email = data.email" name="billemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('billemail')">
                    The Email is required and should be a valid Email address.
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Address</label>
                  <p class="control">
                    <textarea v-model="address = data.address" name="billaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
                  </p>
                  <div v-show="errors.has('billaddress')" class="help is-danger">
                    The Address is a required field..
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field mobile">
                  <label class="label">Contact No(Mobile)</label>
                  <p class="control">
                    <input v-model="mobile = data.mobile_number" name="mobile" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('mobile')">
                    The Contact Number field is required and should contain at least 8 numeric values.
                  </div>
                </div>
                <div class="field">
                  <label class="label">Contact No(Landline)</label>
                  <p class="control">
                    <input v-model="landline = data.landline_number" name="landline" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('landline')">
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
                    <input v-model="city = data.cityname" class="input" name="billcity" v-validate="'required'" type="text" placeholder="City">
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
                    <!-- <input type="hidden" v-model="state_code = data.state_code"> -->
                    <StateDropdown :stateCode="state_code = data.state_code"></StateDropdown>
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
                    <input v-model="pincode = data.pincode" name="billpincode" v-validate="'required|numeric'" type="text" placeholder="Pincode" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('billpincode')">
                    The Pincode is required and should be a numeric code.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <pre>
            {{data}}
          </pre> -->
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="validateAndUpdateDetails()">Update</a>
          <a class="button" @click="$emit('close')">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import StateDropdown from '@/components/StateDropdown';
import jwt_decode from 'jwt-decode';
export default {
  name: 'admin-update-modal',
  props: ['data'],
  created() {
    this.userId = Auth.getUserId();
    this.$bus.$on('state-change', (data) => {
      this.state_code = data.state_id;
    })
  },
  data() {
    return {
      admin_name: '',
      firm_name: '',
      gst_no: '',
      email: '',
      address: '',
      city: '',
      state_code: null,
      pincode: '',
      mobile: null,
      landline: null,
      states: [],
      code: '',
      name: '',
      userId: null
    };
  },
  methods: {
    validateAndUpdateDetails() {
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
          //work or call an api
          this.updateDetails();
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
    updateDetails() {
      api.updateUserDetails(this.userId, this.admin_name, this.email, this.firm_name, this.gst_no,
      this.address, this.city, this.state_code, this.pincode, this.mobile, this.landline)
      .then((response) => {
        if(response.status == 200) {
          let toast = this.$toasted.success('Details Updated.', {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.$bus.$emit('close-admin-update-modal');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    validate() {
      return this.$validator.validateAll();
    },
  },
  components: {
    StateDropdown
  }
}
</script>

<style lang="scss">
.admin-update-modal {
  z-index: 1026;
  .modal-card-body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .field {
    padding: 0;
    margin: 0;
    border: 0;
  }
  .field.mobile {
    padding-bottom: 1rem;
  }
}
</style>
