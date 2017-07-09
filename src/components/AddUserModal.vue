<template lang="html">
  <div class="add-user-modal">

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
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
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Address</label>
                <p class="control">
                  <textarea v-model="address" name="address" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
                </p>
                <div v-show="errors.has('address')" class="help is-danger">
                  The Temporary Address is a required field with minimum of 10 letters.
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Contact No(Mobile)</label>
                <p class="control">
                  <input v-model="mobile" name="mobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('mobile_no')">
                  The Contact Number field is required and should contain at least 8 numeric values.
                </div>
              </div>
              <div class="field">
                <label class="label">Contact No(Landline)</label>
                <p class="control">
                  <input v-model="landline" name="landline_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('landline_no')">
                  The Contact Number field is required and should contain at least 8 numeric values.
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">State</label>
                <p class="control">
                  <input v-model="state" class="input" name="state" v-validate="'required'" type="text" placeholder="State Dropdown">
                </p>
                <div v-show="errors.has('state')" class="help is-danger">
                  The Firm Name is required.
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">GST No</label>
                <p class="control">
                  <input v-model="gst_no" name="gst_no" v-validate="'required'" type="text" placeholder="GST NO" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('gst_no')">
                  The Contact Number field is required and should contain at least 8 numeric values.
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Email</label>
                <p class="control">
                  <input v-model="email" name="email" v-validate="'required|email'" type="email" placeholder="Email" class="input">
                </p>
                <div class="help is-danger" v-show="errors.has('email')">
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
      address: '',
      state: '',
      mobile: null,
      landline: null,
      gst_no: '',
      email: ''
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        alert('Yes');
      }
      else {
        alert('No');
      }
    },
  }
}
</script>

<style lang="scss">
.add-user-modal {
  z-index: 1026;
  // .modal-card-body {
  //   padding: 0;
  // }
  // .discount {
  //   padding: 1rem;
  // }
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
