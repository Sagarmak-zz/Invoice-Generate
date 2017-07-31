<template lang="html">
  <div class="dummy-bill">
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
                  <input v-model="item.invoice_no" :class="{'input': true, 'is-danger': errors.has('invoice_no') }"
                  name="invoice_no" v-validate="'required'"
                  type="text" placeholder="Invoice Number">
                </p>
                <div v-show="errors.has('invoice_no')" class="help is-danger">
                  The Invoice Number is required.
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{'has-error': errors.has('date') }">
                <label class="label">Invoice Date</label>
                <p class="control">
                  <datepicker v-model="item.created_at" :config="{ dateFormat: 'Y-m-d', static: true }" placeholder="Date"></datepicker>
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
        <a class="button is-primary" v-if="hideInputs" @click="hideInputs=!hideInputs">Add</a>
        <a class="button" v-if="!hideInputs" @click="hideInputs=!hideInputs">Hide</a>
      </div>
    </div>
    <!-- box ends -->

    <div class="box">
      <!-- table -->
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                  <tr>
                    <!-- <th>SR</th> -->
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
                    <!-- <th></th> -->
                    <th>Name</th>
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

              </table>
            </div>
          </article>
        </div>
      </div>
      <!-- table ends -->

    </div>

    <div class="box" v-if="!hideInputs">
      <!-- table -->
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                  <tr>
                    <!-- <th>SR</th> -->
                    <th colspan="5">Particulars</th>
                    <th colspan="3">Discount</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Total</th>
                  </tr>
                  <tr>
                    <th><ProductsNameDropdown></ProductsNameDropdown></th>
                    <th>
                      <div :class="{'has-error': errors.has('size') }">
                        <p class="control">
                          <input v-model="item.size" :class="{'input': true, 'is-danger': errors.has('size') }"
                          name="size" v-validate="'required'"
                          type="text" placeholder="Size">
                        </p>
                      </div>
                    </th>
                    <th>
                      <div :class="{'has-error': errors.has('qty') }">
                        <p class="control">
                          <input v-model="item.quantity" @keyup.enter="validateAndAddItemDetails" :class="{'input': true, 'is-danger': errors.has('qty') }"
                          name="qty" v-validate="'required'"
                          type="number" placeholder="Quantity">
                        </p>
                      </div>
                    </th>
                    <th>
                      <div :class="{'has-error': errors.has('rate') }">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static"> &#8377; </a>
                          </p>
                          <p class="control">
                            <input v-model="item.product.price" :class="{'input': true, 'is-danger': errors.has('rate') }"
                            name="rate" v-validate="'required'"
                            type="number" placeholder="Rate">
                          </p>
                        </div>
                      </div>
                    </th>
                    <th> &#8377; {{item.amount = item.quantity * item.product.price}}</th>
                    <th>
                      <div :class="{'has-error': errors.has('discount_percentage') }">
                        <div class="field has-addons">
                          <p class="control">
                            <input v-model="item.discount_percentage" :class="{'input': true, 'is-danger': errors.has('discount_percentage') }"
                            name="discount_percentage" v-validate="'required'"
                            type="number" placeholder="Rate">
                          </p>
                          <p class="control">
                            <a class="button is-static"> % </a>
                          </p>
                        </div>
                      </div>
                    </th>
                    <th class="show">&#8377; {{item.discount_amount = item.amount * (item.discount_percentage / 100)}}</th>
                    <th class="taxAmount">&#8377; {{item.taxable_amount = item.amount - item.discount_amount}}</th>
                  </tr>
                  <tr>
                    <th colspan="2">CGST</th>
                    <th colspan="2">SGST</th>
                    <th colspan="2">IGST</th>
                    <th colspan="2">Add</th>
                  </tr>
                  <tr>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th colspan="2"></th>
                  </tr>
                  <tr>
                    <th>
                      <div :class="{'has-error': errors.has('cgstRate') }">
                        <div class="field has-addons">
                          <p class="control">
                            <input v-model="item.cgst_percentage" :class="{'input': true, 'is-danger': errors.has('cgstRate') }"
                            name="cgstRate" v-validate="'required'"
                            type="number" placeholder="Rate">
                          </p>
                          <p class="control">
                            <a class="button is-static"> % </a>
                          </p>
                        </div>
                      </div>
                    </th>
                    <th>&#8377; {{item.cgst_amount = (this.item.cgst_percentage / 100) * this.item.taxable_amount}}</th>
                    <th>
                      <div :class="{'has-error': errors.has('sgstRate') }">
                        <div class="field has-addons">
                          <p class="control">
                            <input v-model="item.sgst_percentage" :class="{'input': true, 'is-danger': errors.has('sgstRate') }"
                            name="sgstRate" v-validate="'required'"
                            type="number" placeholder="Rate">
                          </p>
                          <p class="control">
                            <a class="button is-static"> % </a>
                          </p>
                        </div>
                      </div>
                    </th>
                    <th>&#8377; {{item.sgst_amount = (this.item.sgst_percentage / 100) * this.item.taxable_amount}}</th>
                    <th>
                      <div :class="{'has-error': errors.has('igstRate') }">
                        <div class="field has-addons">
                          <p class="control">
                            <input v-model='item.igst_percentage' :class="{'input': true, 'is-danger': errors.has('igstRate') }"
                            name="igstRate" v-validate="'required'"
                            type="number" placeholder="Rate">
                          </p>
                          <p class="control">
                            <a class="button is-static"> % </a>
                          </p>
                        </div>
                      </div>
                    </th>
                    <th>&#8377; {{item.igst_amount = (this.item.igst_percentage / 100) * this.item.taxable_amount}}</th>
                    <th colspan="2">
                      &#8377; {{item.total_payable_amount = item.taxable_amount + item.cgst_amount + item.sgst_amount + item.igst_amount}}
                      <a class="button is-pulled-right" @click="addItemData">
                        <i class="fa fa-plus" aria-hidden="true"></i> </a>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </article>
          </div>
        </div>

      </div>
      <pre>
        {{$data}}
      </pre>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import Datepicker from 'vue-bulma-datepicker';
import FirmNameDropdown from '@/components/FirmNameDropdown';
import ProductsNameDropdown from '@/components/ProductsNameDropdown';
import jwt_decode from 'jwt-decode';
export default {
  name: 'dummy-bill',
  props: ['admin_state'],
  components: {
    Datepicker,
    FirmNameDropdown,
    ProductsNameDropdown,
  },
  created() {
    this.userDetails();
    this.decodeToken();
    this.getYear = new Date().getFullYear();
    this.getMonth = new Date().getMonth();
    this.getDate = new Date().getDate();
    this.today = this.getYear + '-' + this.getMonth + '-' + this.getDate;
    this.item.created_at = this.today;
    var converter = require('number-to-words');
    console.log(converter.toWords(42654));
    //firm name
    this.$bus.$on('firm_name_change', (response) => {
      this.item.firm.firm_name = response.firm.firm_name;
      this.item.firm.firm_id = response.firm.id;
      this.item.firm.state_code = response.firm.state_code;
      if(this.item.firm.state_code == this.item.admin_state_code) {
        //2.5% sgst and cgst
        this.item.sgst_percentage = 2.5;
        this.item.cgst_percentage = 2.5;
        this.item.igst_percentage = 0;
      }
      else {
        //5% igst
        this.item.sgst_percentage = 0;
        this.item.cgst_percentage = 0;
        this.item.igst_percentage = 5;
      }
    });

    //ProductNameChange
    this.$bus.$on('product_name_change', response => {
      this.item.product.hsn_code = response.product.hsn_code;
      this.item.product.product_id = response.product.id;
      this.item.product.product_name = response.product.product_name;
      this.item.product.price = response.product.product_price;
    });

  },
  //   user_id(this.user_id), firm_id(this.firm.firm_id), invoice_no(this.invoice_no), taxable_amount(this.taxable_amount),
  //   sgst_percentage(this.sgst_percentage), sgst_amount,//same
  //   cgst_percentage(this.cgst_percentage), cgst_amount,//same
  //   igst_percentage(this.igst_percentage), igst_amount,//same
  //   total_payable_amount, created_at, bill_detail : {
  //              "product_id" : 2, (this.product.product_id)
  //              "quantity" : 1, (this.quantity)
  //              "price" : 123, (this.price)
  //              "discount_percentage" : 3, this.(discount_percentage)
  //              "discount_amount" : 123, this.(discount_amount)
  // }
  data() {
    return {
      item: {
        firm: {
          firm_id: null,
          firm_name: '',
          state_code: null
        },
        admin_state_code: null,
        user_id: null,
        invoice_no: '',
        created_at: '',
        size: '',
        quantity: 0,
        amount: 0,
        discount_percentage: 0,
        discount_amount: 0,
        taxable_amount: 0,
        cgst_percentage: null,
        cgst_amount: 0,
        sgst_percentage: 0,
        sgst_amount: 0,
        igst_percentage: null,
        igst_amount: 0,
        total_payable_amount: 0,

        product: {
          product_id: null,
          hsn_code: null,
          product_name: '',
          price: null,
        },
      },
      bill_detail: [

      ],
      items: [

      ],
      hideInputs: true,
    }
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode(Auth.getToken());
      this.item.user_id = decoded.sub;
    },

    addItemData() {
      let{ quantity, size, discount_percentage, discount_amount } = this.item
      let{ product_id, price } = this.item.product
      this.bill_detail.push({product_id, quantity, price, size, discount_percentage, discount_amount});
    },

    validateBeforeSubmit() {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        if(this.dataIsHere == false) {
          console.log('Validation Failed');
          let toast = this.$toasted.error('Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else {
          this.submitForm();
        }
      }
      else {
        console.log('Validation Failed');
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
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
          let toast = this.$toasted.success("Bill Creation Successful!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.$router.push({ name: 'History' });
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
          this.igst_amount = this.finaligst.toFixed(2);
          this.totalInvoiceAmount = this.totalTaxableAmount + this.finalcgst + this.finalsgst + this.finaligst;
          this.totalInvoiceAmount = this.totalInvoiceAmount.toFixed(2);
          break;
        }
      },

      deleteItem(indexNo) {
        console.log(this.dataArr.splice(indexNo, 1));
        console.log(this.bill_detail.splice(indexNo, 1));
        this.calculateAmount();
      },
      userDetails() {
        api.userDetails()
        .then((response) => {
          this.item.admin_state_code = response.data.state_code;
        })
      },
    },
    computed: {

    }
  }
  </script>

  <style lang="scss">
  .dummy-bill {
    margin-bottom: 2rem;
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

    thead {
      tr {
        align-items: center;
      }
    }

    th, td{
      text-align: center;
    }

    .taxAmount {
      width: 7rem;
    }

  }
  </style>
