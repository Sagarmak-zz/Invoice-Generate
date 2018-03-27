<template lang="html">
  <div class="edit-user-modal">

    <a v-if="!isOpen" @click="isOpen=!isOpen" type="icon is-small">
      <i class="fas fa-edit" aria-isOpen="true"></i>
    </a>

    <div class="modal is-active" v-if="isOpen">

      <div class="modal-background"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit User Details</p>
          <button class="delete" @click="isOpen=!isOpen"></button>
        </header>

        <section class="modal-card-body">

          <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

          <div class="columns">

            <div class="column">
              <div class="field">
                <label class="label">Firm Name<span class="required">*</span></label>
                <p class="control">
                  <input v-model="user.firm_name" name="firm_name" v-validate="'required'"
                  class="input" type="text" placeholder="Name">
                </p>
                <div v-show="errors.has('firm_name')" class="help is-danger">
                  The Firm Name is required.
                </div>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">Contact Person Name<span class="required">*</span></label>
                <p class="control">
                  <input v-model="user.contact_person_name" name="cp_name" v-validate="'required'"
                  class="input" type="email" placeholder="Contact Person Name">
                </p>
                <div v-show="errors.has('cp_name')" class="help is-danger">
                  The Contact Person Name is required.
                </div>
              </div>
            </div>

          </div>
          <div class="columns">

            <!-- <div class="column gst">
            <div class="field">
            <label class="label">GST Number<span class="required">*</span></label>
            <p class="control">
            <input v-model="user.gst_no" name="gst_no" v-validate="'required'"
            class="input" type="text" placeholder="GST Number">
          </p>
          <div v-show="errors.has('gst_no')" class="help is-danger">
          The GST Number is required.
        </div>
      </div>
    </div> -->
    <div class="column gst">
      <label class="label">GST Number<span class="required">*</span> </label>
      <div class="field has-addons">
        <p class="control">
          <input v-model="user.gst_no" name="gst_no" v-validate="'required|min:15|max:15'"
          class="input" type="text" placeholder="GST Number">
        </p>
        <div class="control">
          <a class="button">
            {{user.gst_no.length}}/15
          </a>
        </div>
      </div>
      <div v-show="errors.has('gst_no')" class="help is-danger">
        The GST Number is required and should be exactly 15 characters.
      </div>
    </div>

    <div class="column email">
      <div class="field">
        <label class="label">Email</label>
        <p class="control">
          <input v-model="user.email" name="billemail" v-validate="'required|email'"
          type="email" placeholder="Email" class="input">
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
        <label class="label">Address<span class="required">*</span></label>
        <p class="control">
          <textarea v-model="user.billing.address" name="billaddress" v-validate="'required'"
          class="textarea" placeholder="Address"></textarea>
        </p>
        <div v-show="errors.has('billaddress')" class="help is-danger">
          The Billing Address is a required.
        </div>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">Contact No(Mobile)</label>
        <p class="control">
          <input v-model="user.billing.mobile" name="billmobile_no" v-validate="'numeric|min:8'"
          type="number" placeholder="Contact No" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('billmobile_no')">
          The Contact Number field should contain at least 8 numeric values.
        </div>
      </div>
      <div class="field">
        <label class="label">Contact No(Landline)</label>
        <p class="control">
          <input v-model="user.billing.landline" name="billlandline_no" v-validate="'numeric|min:8'"
          type="number" placeholder="Contact No" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('billlandline_no')">
          The Contact Number field should contain at least 8 numeric values.
        </div>
      </div>
    </div>

  </div>
  <div class="columns">

    <div class="column">
      <div class="field">
        <label class="label">City<span class="required">*</span></label>
        <p class="control">
          <input v-model="user.billing.city" name="billcity" v-validate="'required'"
          class="input" type="text" placeholder="City">
        </p>
        <div v-show="errors.has('billcity')" class="help is-danger">
          The City Name is required.
        </div>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">State<span class="required">*</span></label>
        <p class="control">
          <StateDropdownNewCustomer :stateCode.sync="user.billing.state_code">
          </StateDropdownNewCustomer>
        </p>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">Pincode</label>
        <p class="control">
          <input v-model="user.billing.pincode" name="billpincode"
          type="number" placeholder="Pincode" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('billpincode')">
          The Pincode is required.
        </div>
      </div>
    </div>

  </div>
  <div class="shipping address">
    <h3 class="title">Shipping Address</h3>
    <button class="button is-primary" @click="sameAsBillingAddress()">Same as Above</button>
  </div>
  <div class="columns">

    <div class="column">
      <div class="field">
        <label class="label">Address<span class="required">*</span></label>
        <p class="control">
          <textarea v-model="user.shipping.address" name="shipaddress" v-validate="'required'"
          class="textarea" placeholder="Address"></textarea>
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
          <input v-model="user.shipping.mobile" name="shipmobile_no"
          v-validate="'numeric|min:8'" type="number" placeholder="Contact No" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('shipmobile_no')">
          The Contact Number field should contain at least 8 numeric values.
        </div>
      </div>
      <div class="field">
        <label class="label">Contact No(Landline)</label>
        <p class="control">
          <input v-model="user.shipping.landline" name="shiplandline_no"
          v-validate="'numeric|min:8'" type="number" placeholder="Contact No" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('shiplandline_no')">
          The Contact Number field should contain at least 8 numeric values.
        </div>
      </div>
    </div>

  </div>
  <div class="columns">

    <div class="column">
      <div class="field">
        <label class="label">City<span class="required">*</span></label>
        <p class="control">
          <input v-model="user.shipping.city" name="shipcity" v-validate="'required'"
          class="input" type="text" placeholder="City">
        </p>
        <div v-show="errors.has('shipcity')" class="help is-danger">
          The City Name is required.
        </div>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">State<span class="required">*</span></label>
        <p class="control">
          <StateDropdownNewCustomer :stateCode.sync="user.shipping.state_code">
          </StateDropdownNewCustomer>
        </p>
      </div>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">Pincode</label>
        <p class="control">
          <input v-model="user.shipping.pincode" name="shippincode"
          type="number" placeholder="Pincode" class="input">
        </p>
        <div class="help is-danger" v-show="errors.has('shippincode')">
          The Email is required and should be a valid Email address.
        </div>
      </div>
    </div>

  </div>

</section>
<footer class="modal-card-foot">
  <a class="button is-success" @click="validateAndUpdateUser()">Update</a>
  <a class="button" @click="isOpen=!isOpen">Cancel</a>
</footer>

</div>

</div>
</div>
</template>

<script>
import api from '@/api/main';
import StateDropdownNewCustomer from '@/components/User/StateDropdownNewCustomer';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'edit-user-modal',
  data() {
    return {
      user: {
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
      },
      userId: null,
      loadingLight: false,
      isOpen: false,
    };
  },
  props: {
    userEdit: {
      required: true,
    }
  },
  created() {
    if(this.userEdit.name) {
      this.userId = this.userEdit.id;
      this.user.firm_name = this.userEdit.name;
      this.user.contact_person_name = this.userEdit.person_name;
      this.user.gst_no = this.userEdit.gst_number;
      this.user.email = this.userEdit.email;
      this.user.billing.address = this.userEdit.billing_address;
      this.user.billing.city = this.userEdit.billing_city;
      this.user.billing.state_code = this.userEdit.billing_state_code;
      this.user.billing.pincode = this.userEdit.billing_pincode;
      this.user.billing.mobile = this.userEdit.billing_mobile_number;
      this.user.billing.landline = this.userEdit.billing_landline_number;
      this.user.shipping.address = this.userEdit.shipping_address;
      this.user.shipping.city = this.userEdit.shipping_city;
      this.user.shipping.state_code = this.userEdit.shipping_state_code;
      this.user.shipping.pincode = this.userEdit.shipping_pincode;
      this.user.shipping.mobile = this.userEdit.shipping_mobile_number;
      this.user.shipping.landline = this.userEdit.shipping_landline_number;
    }
  },
  methods: {
    sameAsBillingAddress() {
      this.user.shipping.address = this.user.billing.address;
      this.user.shipping.mobile = this.user.billing.mobile;
      this.user.shipping.landline = this.user.billing.landline;
      this.user.shipping.city = this.user.billing.city;
      this.user.shipping.state_code = this.user.billing.state_code;
      this.user.shipping.pincode = this.user.billing.pincode;
    },
    validateAndUpdateUser() {
      this.validate()
      if ( !this.errors.any() ) {
        this.updateDetails();
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
      api.updateCustomer(
        this.userId, this.user.firm_name, this.user.contact_person_name, this.user.gst_no, this.user.email,
        this.user.billing.address, this.user.billing.city, this.user.billing.state_code,
        this.user.billing.pincode, this.user.billing.mobile, this.user.billing.landline,
        this.user.shipping.address, this.user.shipping.city, this.user.shipping.state_code,
        this.user.shipping.pincode, this.user.shipping.mobile, this.user.shipping.landline,
      )
      .then( ( response ) => {
        this.loadingLight = false;
        let toast = this.$toasted.success( "Customer Updated Successfully!", {
          theme: "outline",
          position: "top-center",
          duration: 3000
        } );
        this.isOpen = false;
        this.$bus.$emit('updateUser');
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
    StateDropdownNewCustomer,
    LoadingLight
  },
}
</script>

<style lang="scss">
.edit-user-modal {
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
  .gst {
    max-width: 50%;
    p.control {
      max-width: 86%;
    }
  }
}
</style>
