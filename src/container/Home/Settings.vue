<template lang="html">
  <div class="settings">
    <div class="box">
      <div class="head">
        <h3 class="title">Edit your Settings</h3>
      </div>
      <div class="form">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Admin Name</label>
              <p class="control">
                <input v-model="admin_name" class="input" name="admin_name" v-validate="'required'" type="text" placeholder="Admin Name">
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
                <input v-model="firm_name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Firm Name">
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
                <input v-model="gst_no" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
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
                <input v-model="email" name="billemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
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
                <textarea v-model="address" name="billaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
              </p>
              <div v-show="errors.has('billaddress')" class="help is-danger">
                The Address is a required field..
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Contact No(Mobile)</label>
              <p class="control">
                <input v-model="mobile" name="mobile" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('mobile')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
            <div class="field">
              <label class="label">Contact No(Landline)</label>
              <p class="control">
                <input v-model="landline" name="landline" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
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
                <input v-model="city" class="input" name="billcity" v-validate="'required'" type="text" placeholder="City">
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
                <input v-model="state" class="input" name="billstate" v-validate="'required'" type="text" placeholder="State Dropdown">
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
                <input v-model="pincode" name="billpincode" v-validate="'required|numeric'" type="text" placeholder="Pincode" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billpincode')">
                The Pincode is required and should be a numeric code.
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- submit -->
      <div class="button-submit">
        <button class="button is-success"> Submit </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data() {
    return {
      admin_name: '',
      firm_name: '',
      gst_no: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      mobile: null,
      landline: null
    }
  }
}
</script>

<style lang="scss">
.settings {
  .box {
    padding: 0;
  }
  .head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }
  .form {
    padding: 1rem;
  }
  .button-submit {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }
}
</style>
