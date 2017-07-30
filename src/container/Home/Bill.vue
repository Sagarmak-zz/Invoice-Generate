<template lang="html">
  <div class="bill">
    <div class="box bill-wala-box">
      <div class="head">
        <h3 class="title">Generate Bill</h3>
      </div>

      <div class="form">
        <div class="form-body" >
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('name') }">
                <label class="label">Customer Name</label>
                <p class="control is-mobile">
                  <FirmNameDropdown></FirmNameDropdown>
                  <a class="icon is-medium" @click="showAddUserModal = true"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </a>
                  <AddUserModal v-if="showAddUserModal" @close="showAddUserModal = false"></AddUserModal>
                </p>
                <div v-show="errors.has('name')" class="help is-danger">
                  The Customer Name is required and should contain only letters.
                </div>
              </div>
            </div>
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
                  <datepicker v-model="date" :config="{ dateFormat: 'Y-m-d', static: true }" placeholder="Date"></datepicker>
                </p>
                <div v-show="errors.has('date')" class="help is-danger">
                  The Name is required and should contain only letters.
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
        <AddItemModal :cgst="cgst_percentage" :sgst="sgst_percentage" :igst="igst_percentage" @close="showAddItemModal = false" v-if="showAddItemModal"></AddItemModal>
      </div>
    </div>
    <!-- box ends -->

    <div class="box" v-if="dataIsHere">
      <!-- table -->
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                  <tr>
                    <th>SR</th>
                    <th colspan="5">Particulars</th>
                    <th colspan="3">Discount</th>
                    <th colspan="2">CGST</th>
                    <th colspan="2">SGST</th>
                    <th colspan="2">IGST</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Total</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data,index in dataArr">
                    <td>{{data.srno}}</td>
                    <td>{{data.particulars}} - {{data.hsncode}}</td>
                    <td>{{data.size}}</td>
                    <td>{{data.quantitys}}</td>
                    <td>{{data.rate}}</td>
                    <td>{{data.amount}}</td>
                    <td>{{data.discRate}}</td>
                    <td>{{data.discAmount}}</td>
                    <td>{{data.discTaxamount}}</td>
                    <td>{{data.cgstRate}}</td>
                    <td>{{data.cgstAmount}}</td>
                    <td>{{data.sgstRate}}</td>
                    <td>{{data.sgstAmount}}</td>
                    <td>{{data.igstRate}}</td>
                    <td>{{data.igstAmount}}</td>
                    <td><a @click="deleteItem(data.srno-1)" class="icon is-small">
                      <i class="fa fa-times-circle" aria-hidden="true"></i> </a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
        <!-- table ends -->

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
          </p>
        </div>
      </div>
      <!-- <pre>
        {{$data}}
      </pre> -->
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
// import bill from '@/stubs/bill';
// import bill2 from '@/stubs/bill2';
import Datepicker from 'vue-bulma-datepicker';
import AddItemModal from '@/components/AddItemModal';
import EditBillModal from '@/components/EditBillModal';
import AddUserModal from '@/components/AddUserModal';
import FirmNameDropdown from '@/components/FirmNameDropdown';
import ProductsNameDropdown from '@/components/ProductsNameDropdown';
import jwt_decode from 'jwt-decode';
export default {
  name: 'bill',
  props: ['admin_state'],
  components: {
    Datepicker,
    AddItemModal,
    EditBillModal,
    AddUserModal,
    FirmNameDropdown,
    ProductsNameDropdown,
  },
  created() {
    this.decodeToken();
    this.getYear = new Date().getFullYear();
    this.getMonth = new Date().getMonth();
    this.getDate = new Date().getDate();
    this.today = this.getYear + '-' + this.getMonth + '-' + this.getDate;
    this.date = this.today;
    var converter = require('number-to-words');
    // console.log(converter.toWords(42654));
    this.$bus.$on('sendItemData', (response) => {
      console.log(response);
      this.dataIsHere = true;
      this.showAddItemModal = false;
      response.data.srno = this.dataArr.length + 1;
      this.dataArr.push(response.data);
      this.bill_detail.push(response.bill_detail);
      this.length = this.dataArr.length;
      //bill_detail
      this.bill_detail_front.product_id = response.data.product_id;
      this.bill_detail_front.quantity = response.data.quantity;
      this.bill_detail_front.price = response.data.rate;
      this.bill_detail_front.size = response.data.size;
      this.bill_detail_front.discount_percentage = response.data.discRate;
      this.bill_detail_front.discount_amount = response.data.discAmount;
      //bill_detail
      // this.bill_detail.push(this.bill_detail_front);
      this.calculateAmount();
    });
    // firm_id
    this.$bus.$on('firm_name_change', (data) => {
      this.firm_id = data.firm.id;
      this.state_code = data.firm.state_code;
      if(this.admin_state == this.state_code) {
        //2.5% sgst and cgst
        this.sgst_percentage = 2.5;
        this.cgst_percentage = 2.5;
        this.igst_percentage = 0;
      }
      else {
        //5% igst
        this.sgst_percentage = 0;
        this.cgst_percentage = 0;
        this.igst_percentage = 5;
      }
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
      user_id: null,
      firm_id: '',
      invNum: '',
      date: '',
      bill_detail: [
      ],
      dataArr: [
      ],
      totalTaxableAmount: 0,
      totalInvoiceAmount: 0,
      state_code: null,
      cgst_percentage: 0,
      cgst_amount: 0,
      sgst_percentage: 0,
      sgst_amount: 0,
      igst_percentage: 0,
      igst_amount: 0,
      finalcgst: 0,
      finalsgst: 0,
      finaligst: 0,
      length: null,
      totalTaxableAmountTemp: 0,
      showAddUserModal: false,
      head_form: false,
      today: '',
      getYear: null,
      getMonth: null,
      getDate: null,
      igstAmount: null,
      dynamic: '',
      dataIsHere: false,
      showAddItemModal: false,
      showEditDetailModal: false,
      formSubmitted: false,
      bill_detail_front: {
        product_id: null,
        quantity: null,
        price: null,
        size: '',
        discount_percentage: null,
        discount_amount: null
      }
    }
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode(Auth.getToken());
      this.user_id = decoded.sub;
    },

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
      //api call to submit the bill
      api.createBill(this.user_id, this.firm_id, this.invNum, this.totalTaxableAmount,
        this.sgst_percentage, this.sgst_amount, this.cgst_percentage, this.cgst_amount, this.igst_percentage, this.igst_amount,
        this.totalInvoiceAmount, this.date, this.bill_detail)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        //send to another page, with nice invoice template and hit print
        // window.print();

      },
      calculateAmount() {
        for (var i = 0; i < this.dataArr.length; i++) {
          this.totalTaxableAmount += this.dataArr[this.length-1].discTaxamount;
          this.finalcgst += this.dataArr[this.length-1].cgstAmount;
          this.cgst_amount = this.finalcgst;
          this.finalsgst += this.dataArr[this.length-1].sgstAmount;
          this.sgst_amount = this.finalsgst;
          this.finaligst += this.dataArr[this.length-1].igstAmount;
          this.igst_amount = this.finaligst;
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

    .bill-wala-box {
      margin-bottom: 0;
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
        padding: 0.4rem;
        border-top: solid 1px #ddd;
        .columns {
          margin: 0;
          .customer-name {
            padding-top: 0;
          }
        }
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

    .tile.is-ancestor {
      margin: 0;
      .tile.is-parent {
        // padding-bottom: 0;
        .table.is-bordered.is-striped.is-narrow {
          margin-bottom: 0;
        }
      }
    }

  }
  </style>
