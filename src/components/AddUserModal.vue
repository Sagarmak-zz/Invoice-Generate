<template lang="html">
  <div class="add-user-modal">

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add User</p>
          <button class="delete" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">
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
            <div class="column">
              <div class="field">
                <label class="label">GST Number</label>
                <p class="control">
                  <input v-model="gst_no" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
                </p>
                <div v-show="errors.has('gst_no')" class="help is-danger">
                  The Contact Person Name is required.
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
                  <input v-model="billing.state" class="input" name="billstate" v-validate="'required'" type="text" placeholder="State Dropdown">
                </p>
                <div v-show="errors.has('billstate')" class="help is-danger">
                  The State is required.
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Pincode</label>
                <p class="control">
                  <input v-model="billing.pincode" name="billpincode" v-validate="'required'" type="text" placeholder="Pincode" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('billpincode')">
                  The Pincode is required.
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Email</label>
                <p class="control">
                  <input v-model="billing.email" name="billemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('billemail')">
                  The Email is required and should be a valid Email address.
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
                  <input v-model="shipping.state" class="input" name="shipstate" v-validate="'required'" type="text" placeholder="State Dropdown">
                </p>
                <div v-show="errors.has('shipstate')" class="help is-danger">
                  The State is required.
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Pincode</label>
                <p class="control">
                  <input v-model="shipping.pincode" name="shippincode" v-validate="'required'" type="text" placeholder="Pincode" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('shippincode')">
                  The Email is required and should be a valid Email address.
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Email</label>
                <p class="control">
                  <input v-model="shipping.email" name="shipemail" v-validate="'required|email'" type="email" placeholder="Email" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('shipemail')">
                  The Email is required and should be a valid Email address.
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="">
            <a class="button is-success" @click="validateBeforeSubmit">Save changes</a>
            <a class="button" @click="$emit('close')">Cancel</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-user-modal',
  created() {
  },
  data() {
    return {
      firm_name: '',
      contact_person_name: '',
      gst_no: '',
      billing: {
        address: '',
        city: '',
        state: '',
        pincode: '',
        mobile: null,
        landline: null,
        email: ''
      },
      shipping: {
        address: '',
        city: '',
        state: '',
        pincode: '',
        mobile: null,
        landline: null,
        email: ''
      },
      checkbox: ''
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        alert('Yes');
      }
      else {
        let toast = this.$toasted.error("Please fill in all the details first!", {
          theme: "outline",
          position: "top-center",
          duration : 3000
        })
      }
    },
    same() {
      this.shipping.address = this.billing.address;
      this.shipping.mobile = this.billing.mobile;
      this.shipping.landline = this.billing.landline;
      this.shipping.city = this.billing.city;
      this.shipping.state = this.billing.state;
      this.shipping.pincode = this.billing.pincode;
      this.shipping.email = this.billing.email;
    }
  },
}
</script>

<style lang="scss">
.add-user-modal {
  z-index: 1026;
  .modal-card-body {
    padding: 0;
  }
  // .modal-card-body {
  //   padding: 0;
  // }
  // .discount {
  //   padding: 1rem;
  // }
  .title.billing {
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    padding-left: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
}
</style>
