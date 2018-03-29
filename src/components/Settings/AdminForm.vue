<template lang="html">
  <div class="admin-form">
    <div class="form">

      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Admin Name<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.admin_name" class="input" name="admin_name" v-validate="'required'" type="text" placeholder="Admin Name">
            </p>
            <div v-show="errors.has('admin_name')" class="help is-danger">
              The Admin Name is required.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Firm Name<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.firm_name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Firm Name">
            </p>
            <div v-show="errors.has('firm_name')" class="help is-danger">
              The Firm Name is required.
            </div>
          </div>
        </div>

      </div>
      <div class="columns">

        <div class="column gst">
          <label class="label">GST Number<span class="required">*</span> </label>
          <div class="field has-addons">
            <p class="control">
              <input v-model="admin.gst_no" v-validate="'required|min:15|max:15'"
              name="gst_no" class="input" type="text" placeholder="GST Number">
            </p>
            <div class="control">
              <a class="button" v-if="admin.gst_no">
                {{admin.gst_no.length}}/15
              </a>
            </div>
          </div>
          <div v-show="errors.has('gst_no')" class="help is-danger">
            The GST Number is required and should be exactly 15 characters.
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Email<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.email" name="email" v-validate="'required|email'" type="email" placeholder="Email" class="input">
            </p>
            <div class="help is-danger" v-show="errors.has('email')">
              The Email is required and should be a valid Email address.
            </div>
          </div>
        </div>

      </div>
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Address<span class="required">*</span></label>
            <p class="control">
              <textarea v-model="admin.address.address" name="address" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
            </p>
            <div v-show="errors.has('address')" class="help is-danger">
              The Address is a required field..
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field mobile">
            <label class="label">Contact No(Mobile)<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.contact.mobile" name="mobile" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
            </p>
            <div class="help is-danger" v-show="errors.has('mobile')">
              The Contact Number field is required and should contain at least 8 numeric values.
            </div>
          </div>
          <div class="field">
            <label class="label">Contact No(Landline)<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.contact.landline" name="landline" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
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
            <label class="label">City<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.address.city" class="input" name="city" v-validate="'required'" type="text" placeholder="City">
            </p>
            <div v-show="errors.has('city')" class="help is-danger">
              The City Name is required.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">State<span class="required">*</span></label>
            <p class="control disable">
              <StateDropdownNewCustomer :stateCode.sync="admin.address.state_code"></StateDropdownNewCustomer>
            </p>
            <div v-show="errors.has('state')" class="help is-danger">
              The State is required.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Pincode<span class="required">*</span></label>
            <p class="control">
              <input v-model="admin.address.pincode" name="pincode"
              v-validate="'required|numeric'" type="text" placeholder="Pincode" class="input">
            </p>
            <div class="help is-danger" v-show="errors.has('pincode')">
              The Pincode is required and should be a numeric code.
            </div>
          </div>
        </div>

      </div>
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Bank Name</label>
            <p class="control">
              <input v-model="admin.bank.bank_name" class="input" name="bank_name" type="text" placeholder="Bank Name">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Branch Name</label>
            <p class="control">
              <input v-model="admin.bank.branch_name" class="input" name="branch_name" type="text" placeholder="Branch Name">
            </p>
          </div>
        </div>

      </div>
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">IFSC Code</label>
            <p class="control">
              <input v-model="admin.bank.ifsc_code" class="input" name="ifsc_code" type="text" placeholder="IFSC Code">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Account Number</label>
            <p class="control">
              <input v-model="admin.bank.account_no" class="input" name="account_no" type="text" placeholder="Account Number">
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class="update-button">

      <button @click="validateAdmin" class="button is-success">Update</button>
      <button @click="addUser = true" class="button is-pulled-right">Add User</button>

      <AddAdminUserModal v-if="addUser" @close="addUser = false"></AddAdminUserModal>

    </div>

  </div>
</template>

<script>
import StateDropdownNewCustomer from '@/components/User/StateDropdownNewCustomer';
import AddAdminUserModal from '@/components/AddAdminUserModal';
export default {
  name: 'admin-form',
  props: ['data'],
  created() {
    this.admin.admin_name = this.data.username;
    this.admin.firm_name = this.data.firm_name;
    this.admin.gst_no = this.data.gst_number;
    this.admin.email = this.data.email;
    this.admin.address.address = this.data.address;
    this.admin.address.city = this.data.cityname;
    this.admin.address.state_code = this.data.state_code;
    this.admin.address.pincode = this.data.pincode;
    this.admin.contact.mobile = this.data.mobile_number;
    this.admin.contact.landline = this.data.landline_number;
    this.admin.bank.bank_name = this.data.bank_name;
    this.admin.bank.branch_name = this.data.branch_name;
    this.admin.bank.ifsc_code = this.data.ifsc_code;
    this.admin.bank.account_no = this.data.account_no;
  },
  data() {
    return {
      admin: {
        admin_name: '',
        firm_name: '',
        gst_no: '',
        email: '',
        address: {
          address: '',
          city: '',
          state_code: null,
          pincode: null,
        },
        contact: {
          mobile: null,
          landline: null,
        },
        bank: {
          bank_name: '',
          branch_name: '',
          ifsc_code: '',
          account_no: null,
        }
      },
      addUser: false
    }
  },
  methods: {
    validateAdmin() {
      if (!this.errors.any()) {
        this.$bus.$emit('admin-form', { admin: this.admin });
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
    }
  },
  components: {
    StateDropdownNewCustomer,
    AddAdminUserModal
  }
}
</script>

<style lang="scss">
.admin-form {
  .form {
    padding: 1rem;
  }
  .update-button {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }
}
</style>
