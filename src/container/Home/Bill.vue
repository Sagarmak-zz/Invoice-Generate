<template lang="html">
  <div class="bill">
    <div class="box">
      <div class="head">
        <h3 class="title">Generate Bill</h3>
      </div>

      <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
        <!-- part 1 -->
        <div class="heading">
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
                  The Customer Name is required and should contain only letters.
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <!-- part-2 -->
      <div class="main-details">
        <h3 class="title">Main Details</h3>
        <a class="button" @click="showDetailModal = true">Add</a>
        <BillModal @close="showDetailModal = false" v-if="showDetailModal"></BillModal>
      </div>

      <div class="table" v-if="dataIsHere">
        <!-- part-1 -->
        <div class="columns">
          <div class="column sr-no">SR</div>
          <div class="column particulars">Particulars</div>
          <div class="column">Numbers</div>
          <div class="column">Discount</div>
          <div class="column">CGST</div>
          <div class="column">SGST</div>
          <div class="column">IGST</div>
        </div>

        <div class="columns">
          <div class="column sr-no"></div>
          <div class="column particulars"></div>
          <div class="column size">Size</div>
          <div class="column qty">Qty</div>
          <div class="column rate">Rate</div>
          <div class="column amount">Amount</div>
          <div class="column rate">Rate</div>
          <div class="column amount">Amount</div>
          <div class="column amount">Total</div>
          <div class="column rate">Rate</div>
          <div class="column amount">Amount</div>
          <div class="column rate">Rate</div>
          <div class="column amount">Amount</div>
          <div class="column rate">Rate</div>
          <div class="column amount">Amount</div>
        </div>

        <div class="columns v-for="data,index in dynamicArr">
          <div class="column sr-no">{{index + 1}}</div>
          <div class="column particulars">{{data.dynamicData.particulars}}</div>
          <div class="column size">{{data.dynamicData.size}}</div>
          <div class="column qty">{{data.dynamicData.quantity}}</div>
          <div class="column rate">{{data.dynamicData.rate}}</div>
          <div class="column amount">{{data.dynamicData.amount}}</div>
          <div class="column rate">{{data.discData.rate}}</div>
          <div class="column amount">{{data.discData.amount}}</div>
          <div class="column amount">{{data.discData.taxamount}}</div>
          <div class="column rate">{{data.taxData.cgstRate}}</div>
          <div class="column amount">{{data.taxData.cgstAmount}}</div>
          <div class="column rate">{{data.taxData.sgstRate}}</div>
          <div class="column amount">{{data.taxData.sgstAmount}}</div>
          <div class="column rate">{{data.taxData.igstRate}}</div>
          <div class="column amount">{{data.taxData.igstAmount}}</div>
        </div>
      </div>

      <div class="field submit-btn">
        <p>
          <button class="button is-success submit-button">
            Submit
          </button>
          <!-- <pre>
          {{$data}}
        </pre> -->
      </p>
    </div>
  </div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker';
import BillModal from '@/components/BillModal';
export default {
  name: 'bill',
  components: {
    Datepicker,
    BillModal
  },
  created() {
    this.$bus.$on('sendItemData', (response) => {
      this.dataIsHere = true;
      this.showDetailModal = false;
      this.dynamicArr.push(response.data);
      console.log(this.dynamicArr);
    });
  },
  data() {
    return {
      dataIsHere: false,
      name: '',
      invNum: '',
      date: '',
      showDetailModal: false,
      dynamicData: {
        srno: null,
        particulars: '',
        msncode: '',
        size: '',
        quantity: null,
        rate: null,
        amount: null
      },
      formSubmitted: false,
      dynamicArr: [
      ]
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        alert('Yes');
        this.submitForm()
      }
      else {
        alert('No')
      }
    },
    validate() {
      return this.$validator.validateAll();
    },
    submitForm(){
    },
    addDynamicData() {
      console.log(this.dynamicData);
      this.dynamicArr.push(this.dynamicData);
    }
  },
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

  .heading {
    padding: 1rem;
  }

  .heading.modal {
    padding: 0;
  }

  .control.is-mobile {
    display: flex;
    max-width: 52%;
    .icon.is-medium {
      padding-left: 0.5rem;
      padding-top: 0.3rem;
    }
  }

  .control.is-mobile.srno {
    max-width: 49%;
  }

  .main-details {
    padding: 1rem;
    border-top: solid 1px #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      margin: 0;
    }
    // padding: 1rem;
  }

  .size {
    max-width: 6rem;
  }
  .sr-no {
    max-width: 1rem;
  }
  .qty {
    max-width: 3rem;
  }
  .rate {
    max-width: 3rem;
  }
  .amount {
    max-width: 5rem;
  }
  .total {
    max-width: 5rem;
  }

  .table {
    padding: 1rem;
  }

  .submit-btn {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }
}
</style>
