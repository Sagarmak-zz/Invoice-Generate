<template lang="html">
  <div class="bill">
    <div class="box">
      <div class="head">
        <h3 class="title has-text-centered">Generate Bill</h3>
      </div>

      <div class="form">
        <div class="form-head">
          <h3 class="title">Heading</h3>
          <button class="button is-primary" @click="head_form = true" v-if="!head_form">Show</button>
          <button class="button" @click="head_form = false" v-if="head_form">Hide</button>
        </div>
        <div class="form-body" v-if="head_form">
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
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('name') }">
                <label class="label">Customer Name</label>
                <p class="control is-mobile">
                  <input v-model="name" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" v-validate="'required'"
                  type="text" placeholder="Customer Name Dropdown">
                  <a class="icon is-medium" @click="showAddUserModal = true"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </a>
                  <AddUserModal v-if="showAddUserModal" @close="showAddUserModal = false"></AddUserModal>
                </p>
                <div v-show="errors.has('name')" class="help is-danger">
                  The Customer Name is required and should contain only letters.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- part-2 -->
      <div class="main-details">
        <h3 class="title">Main Details</h3>
        <a class="button is-primary" @click="showAddItemModal = true">Add</a>
        <AddItemModal @close="showAddItemModal = false" v-if="showAddItemModal"></AddItemModal>
      </div>

      <div class="table" v-if="dataIsHere">
        <!-- part-1 -->
        <div class="columns box">
          <div class="column sr-no1">SR</div>
          <div class="column particulars1">Particulars</div>
          <div class="column discount1">Discount</div>
          <div class="column cgst">CGST</div>
          <div class="column sgst">SGST</div>
          <div class="column igst">IGST</div>
          <div class="column edit-delete1"></div>
        </div>

        <div class="columns box">
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
          <div class="column edit-delete"></div>
        </div>

        <div class="columns box" v-for="data,index in dataArr">
          <div class="column sr-no">{{data.srno}}</div>
          <div class="column particulars">{{data.particulars}} - {{data.hsncode}}</div>
          <div class="column size">{{data.size}}</div>
          <div class="column qty">{{data.quantity}}</div>
          <div class="column rate">{{data.rate}}</div>
          <div class="column amount">{{data.amount}}</div>
          <div class="column rate">{{data.discRate}}</div>
          <div class="column amount">{{data.discAmount}}</div>
          <div class="column amount">{{data.discTaxamount}}</div>
          <div class="column rate">{{data.cgstRate}}</div>
          <div class="column amount">{{data.cgstAmount}}</div>
          <div class="column rate">{{data.sgstRate}}</div>
          <div class="column amount">{{data.sgstAmount}}</div>
          <div class="column rate">{{data.igstRate}}</div>
          <div class="column amount">{{data.igstAmount}}</div>
          <!-- Edit -->
          <div class="column sr-no edit"><EditBillModal :key="data.srno-1" :data="data"></EditBillModal></div>
          <!-- Delete -->
          <div class="column sr-no"><a @click="deleteItem(data.srno-1)" class="icon is-small">
            <i class="fa fa-times-circle" aria-hidden="true"></i> </a></div>

          </div>
        </div>

        <div class="additional-details" v-if="dataIsHere">
          <div class="is-pulled-right">Total Taxable Amount: <strong>&#8377; {{totalTaxableAmount}}</strong></div> <br>
          <div class="is-pulled-right">CGST: <strong>&#8377; {{finalcgst}}</strong></div> <br>
          <div class="is-pulled-right">SGST: <strong>&#8377; {{finalsgst}}</strong></div> <br>
          <div class="is-pulled-right">IGST: <strong>&#8377; {{finaligst}}</strong></div> <br>
          <div class="is-pulled-right">Total Invoice Value: <strong>&#8377; {{totalInvoiceAmount}}</strong></div>
        </div>

        <div class="field submit-btn" v-if="dataIsHere">
          <p>
            <button @click="validateBeforeSubmit" class="button is-success submit-button">
              Submit
            </button>
            <!-- <pre>
            {{$dynamicArr}}
          </pre> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bill from '@/stubs/bill';
import bill2 from '@/stubs/bill2';
import Datepicker from 'vue-bulma-datepicker';
import AddItemModal from '@/components/AddItemModal';
import EditBillModal from '@/components/EditBillModal';
import AddUserModal from '@/components/AddUserModal';
export default {
  name: 'bill',
  components: {
    Datepicker,
    AddItemModal,
    EditBillModal,
    AddUserModal
  },
  created() {
    var converter = require('number-to-words');
    console.log(converter.toWords(42654))
    this.$bus.$on('sendItemData', (response) => {
      this.dataIsHere = true;
      this.showAddItemModal = false;
      response.data.srno = this.dataArr.length + 1;
      this.dataArr.push(response.data);
      this.length = this.dataArr.length;
      this.calculateAmount();
    });
    // this.dataIsHere = true;
    // this.showAddItemModal = false;
    // bill.srno = this.dataArr.length + 1;
    // this.dataArr.push(bill);
    // bill2.srno = this.dataArr.length + 1;
    // this.dataArr.push(bill2);
    // this.calculateAmount();
  },
  data() {
    return {
      dynamic: '',
      dataIsHere: false,
      name: '',
      invNum: '',
      date: '',
      showAddItemModal: false,
      showEditDetailModal: false,
      formSubmitted: false,
      igstAmount: null,
      dataArr: [
      ],
      totalTaxableAmount: 0,
      totalTaxableAmountTemp: 0,
      finalcgst: 0,
      finalsgst: 0,
      finaligst: 0,
      totalInvoiceAmount: 0,
      length: null,
      showAddUserModal: false,
      head_form: false
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        if(this.dataIsHere == false) {
          alert('No');
        }
        else {
          this.submitForm();
        }
      }
      else {
        alert('No');
      }
    },
    validate() {
      return this.$validator.validateAll();
    },
    submitForm() {
      //send to another page, with nice invoice template and hit print
      // window.print();
    },
    calculateAmount() {
      for (var i = 0; i < this.dataArr.length; i++) {
        this.totalTaxableAmount += this.dataArr[this.length-1].discTaxamount;
        this.finalcgst += this.dataArr[this.length-1].cgstAmount;
        this.finalsgst += this.dataArr[this.length-1].sgstAmount;
        this.finaligst += this.dataArr[this.length-1].igstAmount;
        this.totalInvoiceAmount = this.totalTaxableAmount + this.finalcgst + this.finalsgst + this.finaligst;
        break;
      }
    },
    deleteItem(indexNo) {
      console.log(this.dataArr.splice(indexNo, 1));
    }
  },
}
</script>

<style lang="scss">
.bill {
  .box {
    padding: 0;
  }

  .head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }

  .form {
    .form-head {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        margin: 0;
      }
    }
    .form-body {
      padding: 1rem;
      border-top: solid 1px #ddd;
    }
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
    border-bottom: solid 1px #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      margin: 0;
    }
    // padding: 1rem;
  }

  .sr-no1 {
    border-left: solid 1px #ddd;
    max-width: 2.1rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
    padding-left: 0.4rem;
  }
  .particulars1 {
    max-width: 26rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
  }
  .numbers {
    max-width: 5rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
  }
  .discount1 {
    max-width: 13rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
  }
  .cgst {
    max-width: 8rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
  }
  .sgst {
    max-width: 8rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
  }
  .igst {
    max-width: 8rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    border-top: solid 1px #ddd;
    text-align:center;
  }
  .size {
    max-width: 6rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .sr-no {
    border-left: solid 1px #ddd;
    max-width: 2.1rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
    padding-left: 0.6rem;
  }
  .sr-no.edit {
    z-index: 1026;
  }
  .particulars {
    max-width: 15rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .qty {
    max-width: 3rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .rate {
    max-width: 3rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .amount {
    max-width: 5rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .total {
    max-width: 5rem;
    border-bottom: solid 1px #ddd;
    border-right: solid 1px #ddd;
    text-align:center;
  }
  .edit-delete1 {
    max-width: 3rem;
  }
  .edit-delete {
    max-width: 4.2rem;
  }

  .columns {
    max-width: 100%;
  }

  .box {
    border-radius: 0;
  }

  .table {
    padding: 1rem;
    padding-top: 2rem;
  }

  .additional-details {
    border-top: solid 1px #ddd;
    display: flow-root;
    .is-pulled-right {
      margin-right: 1rem;
    }
  }

  .submit-btn {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }
}
</style>
