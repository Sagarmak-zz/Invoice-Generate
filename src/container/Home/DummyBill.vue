<template lang="html">
  <div class="dummy-bill">
    <div class="box bill-wala-box">
      <div class="head">
        <h3 class="title">Generate Bill</h3>
      </div>

      <div name="top" class="form">
        <div class="form-body" >
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('customer') }">
                <label class="label">Customer Name</label>
                <p class="control is-mobile">
                  <FirmNameDropdown></FirmNameDropdown>
                </p>
                <div v-show="errors.has('customer')" class="help is-danger">
                  The Customer Name is required and should contain only letters.
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{'has-error': errors.has('invoice_no') }">
                <label class="label">Invoice Number</label>
                <p class="control">
                  <input v-model="item.invoice_no" :class="{'input': true, 'is-danger': errors.has('invoice_no') }"
                  name="invoice_no" v-validate="'required'" @keyup.enter="callMainDetailsAdd()"
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
        <a class="button is-primary" v-if="hideInputs" @click="callMainDetailsAdd()">Add</a>
        <a class="button" v-if="!hideInputs" @click="hideInputs=!hideInputs">Hide</a>
      </div>
    </div>
    <!-- box ends -->

    <form name="middle" class="box" v-if="!hideInputs">
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
                    <th>Quantity</th>
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
                          <input @keyup.enter="addItemData" v-model="item.quantity" :class="{'input': true, 'is-danger': errors.has('qty') }"
                          name="qty" v-validate="'required'"
                          type="number" placeholder="Quantity">
                        </p>
                      </div>
                    </th>
                    <th>
                      <div :class="{'has-error': errors.has('price') }">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static"> &#8377; </a>
                          </p>
                          <p class="control">
                            <input v-model="item.product.price" :class="{'input': true, 'is-danger': errors.has('price') }"
                            name="price" v-validate="'required'"
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
                            <input @keyup.enter="addItemData" v-model="item.discount_percentage" :class="{'input': true, 'is-danger': errors.has('discount_percentage') }"
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
                    <th></th>
                  </tr>
                  <tr>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Total</th>
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
                    <th>
                      &#8377; {{item.total_payable_amount = item.taxable_amount + item.cgst_amount + item.sgst_amount + item.igst_amount}}
                    </th>
                    <th><a class="button is-pulled-right" @click="addItemData">
                      <i class="fa fa-plus" aria-hidden="true"></i> </a></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </article>
          </div>
        </div>

      </form>

      <div class="item-details" v-if="items.length">
        <div class="box">
          <!-- table -->
          <div class="upper">
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
                      <tbody>
                        <tr v-for="it,index in items">
                          <td>{{it.product_name}}</td>
                          <td>{{it.size}}</td>
                          <td>{{it.quantity}}</td>
                          <td>{{it.price}}</td>
                          <td>{{it.amount}}</td>
                          <td>{{it.discount_percentage}}</td>
                          <td>{{it.discount_amount}}</td>
                          <td>{{it.taxable_amount}}</td>
                          <td>{{it.cgst_percentage}}</td>
                          <td>{{it.cgst_amount}}</td>
                          <td>{{it.sgst_percentage}}</td>
                          <td>{{it.sgst_amount}}</td>
                          <td>{{it.igst_percentage}}</td>
                          <td>{{it.igst_amount}}</td>
                          <td><a class="icon" @click="removeItem(it, index)">
                            <i class="fa fa-times" aria-hidden="true"></i>
                          </a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <!-- table ends -->

          <div class="lower-part-two">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                      <tbody>
                        <tr> <td>Total Taxable Amount:</td> <th> &#8377; {{item.ftaxable_amount}} </th> </tr>
                        <tr> <td>CGST:</td> <th> &#8377; {{item.fcgst_amount}} </th> </tr>
                        <tr> <td>SGST:</td> <th> &#8377; {{item.fsgst_amount}} </th> </tr>
                        <tr> <td>IGST:</td> <th> &#8377; {{item.figst_amount}} </th> </tr>
                        <tr> <td>Total Invoice Value:</td> <th> &#8377; {{item.ftotal_payable_amount}} </th> </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div class="submit-btn">
            <button @click="validateAndCallApi" class="button is-success">Submit</button>
          </div>
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
        ftaxable_amount: 0,
        cgst_percentage: null,
        cgst_amount: 0,
        fcgst_amount: 0,
        sgst_percentage: 0,
        sgst_amount: 0,
        fsgst_amount: 0,
        igst_percentage: null,
        igst_amount: 0,
        figst_amount: 0,
        total_payable_amount: 0,
        ftotal_payable_amount: 0,
        product: {
          product_id: null,
          hsn_code: null,
          product_name: '',
          price: null,
        },
      },
      bill_detail: [ ],
      items: [ ],
      hideInputs: true,
    }
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode(Auth.getToken());
      this.item.user_id = decoded.sub;
    },

    addItemData() {
      //validate first
      if(this.item.quantity == 0) {
        let toast = this.$toasted.error('The Quantity should be greater than 0.', {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
      }
      else {
        this.$validator.validateAll({
          //item name
          'size': this.item.size,
          'price': this.item.product.price,
        })
        .then(result => {
          if (result == false) {
            // validation failed.
            let toast = this.$toasted.error('Please fill in the details.', {
              theme: "outline",
              position: "bottom-center",
              duration : 3000
            });
          }
          else {
            // success stuff.
            this.addDataToItems();
          }
        }).catch((error) => {
          console.log(error);
          // something went wrong (non-validation related).
          let toast = this.$toasted.error('Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        });
      }
    },

    removeItem(it, index) {
      console.log(it);
      console.log(index);

      // values update
      this.item.ftaxable_amount -= it.taxable_amount;
      this.item.fcgst_amount -= it.cgst_amount
      this.item.fsgst_amount -= it.sgst_amount;
      this.item.figst_amount -= it.igst_amount;
      this.item.ftotal_payable_amount -= it.total_payable_amount;
      // bill_detail
      this.bill_detail.splice(index, 1);
      // items
      this.items.splice(index, 1);
    },

    computed_total_payable_amount() {
      var x;  //for length
      for (x in this.items) {
        // console.log(this.items[this.items.length-1]);
        this.item.ftaxable_amount += this.items[this.items.length-1].taxable_amount;
        this.item.fcgst_amount += this.items[this.items.length-1].cgst_amount;
        this.item.fsgst_amount += this.items[this.items.length-1].sgst_amount;
        this.item.fsgst_amount += this.items[this.items.length-1].igst_amount;
        this.item.ftotal_payable_amount += this.items[this.items.length-1].total_payable_amount;
        break;
      }
    },

    validateAndCallApi() {
      if(this.items.length == 0) {
        let toast = this.$toasted.error("No Data!", {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
      }
      else {
        this.callApi();
      }
    },
    validate() {
      return this.$validator.validateAll();
    },
    callApi() {
      //api call to submit the bill
      api.createBill(this.item.user_id, this.item.firm.firm_id, this.item.invoice_no,
        this.item.ftaxable_amount, this.item.sgst_percentage, this.item.fsgst_amount,
         this.item.cgst_percentage, this.item.fcgst_amount, this.item.igst_percentage, this.item.figst_amount,
        this.item.ftotal_payable_amount, this.item.created_at, this.bill_detail)
        .then(response => {
          let toast = this.$toasted.success("Bill Creation Successful!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          // this.$router.push({ name: 'Sample' });
        })
        .catch(error => {
          console.log(error);
        })
        //send to another page, with nice invoice template and hit print
        // window.print();

      },

      deleteItem(indexNo) {
        this.dataArr.splice(indexNo, 1);
        this.bill_detail.splice(indexNo, 1);
        this.calculateAmount();
      },
      userDetails() {
        api.userDetails()
        .then((response) => {
          this.item.admin_state_code = response.data.state_code;
        })
      },
      callMainDetailsAdd() {
        this.validate()
        if (this.errors.any()) {
          //errors
          let toast = this.$toasted.error("Please fill in all the details first", {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else {
          this.hideInputs=!this.hideInputs;
        }
      },

      addDataToItems() {
        let{ quantity, size, amount, discount_percentage, discount_amount, taxable_amount,
          cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, igst_percentage, igst_amount,
          total_payable_amount } = this.item;
          let{ product_id, hsn_code, product_name, price } = this.item.product;
          //bill_detail complete
          this.bill_detail.push({product_id, quantity, price, size, discount_percentage, discount_amount});
          //item detail complete
          this.items.push({product_name, size, quantity, price, amount, discount_percentage, discount_amount,
            taxable_amount, cgst_percentage, cgst_amount, sgst_percentage, sgst_amount, igst_percentage, igst_amount,
            total_payable_amount});
            this.computed_total_payable_amount();
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

        .lower {
          border-top: solid 1px #ddd;
          width: 17rem;
          margin-left: auto;
          padding-right: 1rem;
          padding-left: 0.5rem;
          border-left: solid 1px #ddd;
          border-bottom: solid 1px #ddd;
          .left {
          }
          .right {
            float: right;
          }
        }

        .lower-part-two {
          width: fit-content;
          margin-left: auto;
        }

        .item-details {
          .box {
            border-bottom: solid 1px #ddd;
          }
        }

      }
      </style>
