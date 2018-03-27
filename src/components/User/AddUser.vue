<template lang="html">
  <div class="add-user">

    <div class="columns">

      <div class="column">
        <div class="field">
          <label class="label">Firm Name<span class="required">*</span> </label>
          <p class="control">
            <input v-model="user.firm_name" class="input" name="firm_name"
            v-validate="'required'" type="text" placeholder="Name">
          </p>
          <div v-show="errors.has('firm_name')" class="help is-danger">
            The Firm Name is required.
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Contact Person Name<span class="required">*</span> </label>
          <p class="control">
            <input v-model="user.contact_person_name" class="input" name="cp_name"
            v-validate="'required'" type="text" placeholder="Contact Person Name">
          </p>
          <div v-show="errors.has('cp_name')" class="help is-danger">
            The Contact Person Name is required.
          </div>
        </div>
      </div>

    </div>
    <div class="columns">

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
            <input v-model="user.email" name="billemail" v-validate="'email'"
            type="email" placeholder="Email" class="input">
          </p>
          <div class="help is-danger" v-show="errors.has('billemail')">
            The Email should be a valid Email address.
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
            <textarea v-model="user.billing.address" v-validate="'required'" name="billaddress"
            class="textarea" placeholder="Address"></textarea>
          </p>
          <div v-show="errors.has('billaddress')" class="help is-danger">
            The Billing Address is required.
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Contact No(Mobile)</label>
          <p class="control">
            <input v-model="user.billing.mobile" v-validate="'numeric|min:8'" name="billmobile_no"
            type="number" placeholder="Contact No" class="input">
          </p>
          <div class="help is-danger" v-show="errors.has('billmobile_no')">
            The Contact Number field is required and should contain at least 8 numeric values.
          </div>
        </div>
        <div class="field">
          <label class="label">Contact No(Landline)</label>
          <p class="control">
            <input v-model="user.billing.landline" name="billlandline_no" v-validate="'numeric|min:8'" type="number" placeholder="Contact No" class="input">
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
            <input v-model="user.billing.city" v-validate="'required'" name="billcity"
            class="input" type="text" placeholder="City">
          </p>
          <div v-show="errors.has('billcity')" class="help is-danger">
            The City is required.
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
            <input v-model="user.billing.pincode" name="billpincode" type="number"
            placeholder="Pincode" class="input" @keyup.enter="sameAsBillingAddress">
          </p>
        </div>
      </div>

    </div>

    <div class="shipping address">
      <h3 class="title">Shipping Address</h3>
      <button class="button is-primary" @click="sameAsBillingAddress">Same as Above</button>
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
            The Shipping Address is required.
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Contact No(Mobile)</label>
          <p class="control">
            <input v-model="user.shipping.mobile" v-validate="'numeric|min:8'" name="shipmobile_no"
            type="number" placeholder="Contact No" class="input">
          </p>
          <div class="help is-danger" v-show="errors.has('shipmobile_no')">
            The Contact Number field should contain at least 8 numeric values.
          </div>
        </div>
        <div class="field">
          <label class="label">Contact No(Landline)</label>
          <p class="control">
            <input v-model="user.shipping.landline" v-validate="'numeric|min:8'" name="shiplandline_no"
            type="number" placeholder="Contact No" class="input">
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
             type="text" class="input" placeholder="City">
          </p>
          <div v-show="errors.has('shipcity')" class="help is-danger">
            The City is required.
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
            <input v-model="user.shipping.pincode" name="shippincode" type="number"
            placeholder="Pincode" class="input">
          </p>
        </div>
      </div>

    </div>

    <div class="button-form">
      <button class="button is-primary" @click="validateUser">Save</button>
    </div>

  </div>
</template>

<script>
import StateDropdownNewCustomer from '@/components/User/StateDropdownNewCustomer';
export default {
  name: 'add-user',
  created() {
  },
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
    }
  },
  methods: {
    validateUser() {
      this.validate()
      if (!this.errors.any()) {
        console.log(this.user);
        this.$bus.$emit('add-user', { user: this.user });
      }
      else {
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        });
      }
    },
    validate() {
      return this.$validator.validateAll();
    },
    sameAsBillingAddress() {
      this.user.shipping.address = this.user.billing.address;
      this.user.shipping.mobile = this.user.billing.mobile;
      this.user.shipping.landline = this.user.billing.landline;
      this.user.shipping.city = this.user.billing.city;
      this.user.shipping.state_code = this.user.billing.state_code;
      this.$bus.$emit('state-change', {state: this.user.shipping.state_code});
      this.user.shipping.pincode = this.user.billing.pincode;
    },
  },
  components: {
    StateDropdownNewCustomer
  },
}
</script>

<style lang="scss">
.add-user {
  .button-form {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
