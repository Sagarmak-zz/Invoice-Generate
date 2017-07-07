<template lang="html">
  <div class="bill">
    <div class="box">
      <div class="head">
        <h3 class="title">Generate Bill</h3>
      </div>

      <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
        <!-- part 1 -->
        <div class="part-one">
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('name') }">
                <label class="label">Customer Name</label>
                <p class="control is-mobile">
                  <input v-model="name" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" v-validate="'required'"
                  type="text" placeholder="Customer Name Dropdown">
                  <span class="icon is-medium"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </span>
                </p>
                <div v-show="errors.has('name')" class="help is-danger">
                  The Name is required and should contain only letters.
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('name') }">
                <label class="label">Invoice Number</label>
                <p class="control">
                  <input v-model="invNum" :class="{'input': true, 'is-danger': errors.has('inv_num') }"
                  name="inv_num" v-validate="'required'"
                  type="text" placeholder="Invoice Number">
                </p>
                <div v-show="errors.has('inv_num')" class="help is-danger">
                  The Invoice Number is required.
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{'has-error': errors.has('date') }">
                <label class="label">Invoice Date</label>
                <p class="control">
                  <!-- <input :class="{'input': true, 'is-danger': errors.has('date') }" name="date"
                  v-validate="'required'" type="text" placeholder="Invoice Date"> -->
                  <datepicker v-model="date" v-validate="'required'" name="date" placeholder="Invoice Date"
                  :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }"></datepicker>
                </p>
                <div v-show="errors.has('date')" class="help is-danger">
                  The Name is required and should contain only letters.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- part-2 -->
        <!-- <div class="main-details">
          <div class="head">
            <h3 class="title">Main Details</h3>
          </div>
          <div class="body">
            <div class="columns">
              <div class="column">
                <div :class="{'has-error': errors.has('name') }">
                  <label class="label">Customer Name</label>
                  <p class="control is-mobile">
                    <input v-model="name" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" v-validate="'required'"
                    type="text" placeholder="Customer Name Dropdown">
                    <span class="icon is-medium"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </span>
                  </p>
                  <div v-show="errors.has('name')" class="help is-danger">
                    The Name is required and should contain only letters.
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div :class="{'has-error': errors.has('name') }">
                  <label class="label">Invoice Number</label>
                  <p class="control">
                    <input v-model="invNum" :class="{'input': true, 'is-danger': errors.has('inv_num') }"
                    name="inv_num" v-validate="'required'"
                    type="text" placeholder="Invoice Number">
                  </p>
                  <div v-show="errors.has('inv_num')" class="help is-danger">
                    The Invoice Number is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('date') }">
                  <label class="label">Invoice Date</label>
                  <p class="control">
                    <datepicker v-model="date" v-validate="'required'" name="date" placeholder="Invoice Date"
                    :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }"></datepicker>
                  </p>
                  <div v-show="errors.has('date')" class="help is-danger">
                    The Name is required and should contain only letters.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="field submit-btn">
          <p>
            <button name="company" class="button is-success submit-button">
              Submit
            </button>
            <!-- <pre>
            {{$data}}
          </pre> -->
        </p>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker';

export default {
  name: 'bill',
  components: {
    Datepicker,
  },
  data() {
    return {
      name: '',
      invNum: '',
      date: '',
      formSubmitted: false
    }
  },
  methods: {
    validateBeforeSubmit(e) {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        this.submitForm()
        alert('Yes');
      }
    },
    submitForm(){
      this.formSubmitted = true
    }
  }
}
</script>

<style lang="scss">
.bill {
  margin-bottom: 1rem;
  margin-right: 1rem;

  .box {
    padding: 0;
  }

  .head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }

  .part-one {
    padding: 1rem;
  }

  .control.is-mobile {
    display: flex;
    max-width: 52%;
    .icon.is-medium {
      padding-left: 0.5rem;
      padding-top: 0.3rem;
    }
  }

  .submit-btn {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }
}
</style>
