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
                <input class="input" name="admin_name" v-validate="'required'" type="text" placeholder="Admin Name">
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
                <input class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Firm Name">
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
              <label class="label">Contact No(Mobile)</label>
              <p class="control">
                <input name="billmobile_no" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('billmobile_no')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
            <div class="field">
              <label class="label">GST Number</label>
              <p class="control">
                <input class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
              </p>
              <div v-show="errors.has('gst_no')" class="help is-danger">
                The Contact Person Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Address</label>
              <p class="control">
                <textarea name="billaddress" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
              </p>
              <div v-show="errors.has('billaddress')" class="help is-danger">
                The Billing Address is a required field..
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
