<template lang="html">
  <div class="edit-customer-modal">
    <a v-if="hidden" @click="hidden=!hidden" type="icon is-small"><i class="fas fa-edit" aria-hidden="true"></i></a>
    <!-- <a v-if="hidden" @click="hidden=!hidden" class="icon is-small"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> </a> -->
    <div class="modal is-active" v-if="!hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
          <button class="delete" @click="hidden=!hidden"></button>
        </header>
        <section class="modal-card-body">
          <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Firm Name</label>
                <p class="control">
                  <input v-model="firm_name = customer.name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Name">
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
                  <input v-model="contact_person_name = customer.person_name" class="input" name="cp_name" v-validate="'required'" type="email" placeholder="Contact Person Name">
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
                  <input v-model="gst_no = customer.gst_number" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
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
                  <input v-model="email = customer.email" name="billemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
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
                  <textarea v-model="billing.address = customer.billing_address" name="billaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
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
                  <input v-model="billing.mobile = customer.billing_mobile_number" name="billmobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('billmobile_no')">
                  The Contact Number field is required and should contain at least 8 numeric values.
                </div>
              </div>
              <div class="field">
                <label class="label">Contact No(Landline)</label>
                <p class="control">
                  <input v-model="billing.landline = customer.billing_landline_number" name="billlandline_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
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
                  <input v-model="billing.city = customer.billing_city" class="input" name="billcity" v-validate="'required'" type="text" placeholder="City">
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
                  <!-- <input type="hidden" v-model="billing.state_code = customer.billing_state_code"> -->
                  <StateDropdown1 :edit_bill_state_code="customer.billing_state_code"></StateDropdown1>
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
                  <input v-model="billing.pincode = customer.billing_pincode" name="billpincode" v-validate="'required'" type="number" placeholder="Pincode" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('billpincode')">
                  The Pincode is required.
                </div>
              </div>
            </div>
          </div>

          <div class="shipping address">
            <h3 class="title">Shipping Address</h3>
            <button class="button is-primary" @click="same()">Same as Above</button>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Address Line 1</label>
                <p class="control">
                  <textarea v-model="shipping.address = customer.shipping_address" name="shipaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
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
                  <input v-model="shipping.mobile = customer.shipping_mobile_number" name="shipmobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('shipmobile_no')">
                  The Contact Number field is required and should contain at least 8 numeric values.
                </div>
              </div>
              <div class="field">
                <label class="label">Contact No(Landline)</label>
                <p class="control">
                  <input v-model="shipping.landline = customer.shipping_landline_number" name="shiplandline_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
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
                  <input v-model="shipping.city = customer.shipping_city" class="input" name="shipcity" v-validate="'required'" type="text" placeholder="City">
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
                  <!-- <input type="hidden" v-model="shipping.state_code = customer.shipping_state_code"> -->
                  <!-- <StateDropdown2 :edit_ship_state_code="customer.shipping_state_code"></StateDropdown2> -->
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
                  <input v-model="shipping.pincode = customer.shipping_pincode" name="shippincode" v-validate="'required'" type="number" placeholder="Pincode" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('shippincode')">
                  The Email is required and should be a valid Email address.
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="validateAndUpdateDetails()">Update</a>
          <a class="button" @click="hidden=!hidden">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import StateDropdown1 from '@/components/StateDropdownCustomer1';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'edit-customer-modal',

  data() {
    return {
      hidden: true,
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
      newBcode: 0,
      newScode: 0,
      loadingLight: false
    };
  },
  props: {
    customer: {
      required: true,
    }
  },
  created() {
    this.billing.state_code = this.customer.billing_state_code;
    this.shipping.state_code = this.customer.shipping_state_code;
    this.$bus.$on( 'state-change1', ( data ) => {
      this.billing.state_code = data.state_id;
    } );
    this.$bus.$on( 'state-change2', ( data ) => {
      this.shipping.state_code = data.state_id;
    } );
  },
  methods: {
    same() {
      this.customer.shipping_address = this.billing.address;
      this.customer.shipping_mobile_number = this.billing.mobile;
      this.customer.shipping_landline_number = this.billing.landline;
      this.customer.shipping_city = this.billing.city;
      this.customer.shipping_state_code = this.billing.state_code;
      this.shipping.state_code = this.billing.state_code;
      this.customer.shipping_pincode = this.billing.pincode;
    },
    validateAndUpdateDetails() {
      this.validate()
      if ( !this.errors.any() ) {
        if ( this.dataIsHere == false ) {
          let toast = this.$toasted.error( 'Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        } else {
          this.updateDetails();
        }
      } else {
        let toast = this.$toasted.error( 'Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    },
    updateDetails() {
      this.loadingLight = true;
      api.updateCustomer( this.customer.id, this.firm_name, this.contact_person_name, this.gst_no, this.email,
          this.billing.address, this.billing.city, this.billing.state_code, this.billing.pincode, this.billing.mobile, this.billing.landline,
          this.shipping.address, this.shipping.city, this.shipping.state_code, this.shipping.pincode, this.shipping.mobile, this.shipping.landline )
        .then( ( response ) => {
          this.loadingLight = false;
          let toast = this.$toasted.success( "Customer Updated Successfully!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
          this.hidden = true;
          console.log( response );
        } )
        .catch( ( error ) => {
          this.loadingLight = false;
          console.log( error );
        } )

    },
    validate() {
      return this.$validator.validateAll();
    },
  },
  components: {
    StateDropdown1,
    LoadingLight
  },
}
</script>

<style lang="scss">
.edit-customer-modal {
    .modal.is-active {
        z-index: 1026;
    }
    .modal-card-body {
        padding: 0;
    }
    .modal-card-foot {
        display: flex;
        justify-content: flex-start;
    }
}
</style>
