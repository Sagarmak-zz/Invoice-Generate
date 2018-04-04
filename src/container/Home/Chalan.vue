<template lang="html">
  <div class="chalan">

    <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

    <div class="box top-box">
      <div class="head">
        <h3 class="title">Generate Chalan</h3>

        <div class="fiscal-year">
          <div class="columns">
            <h3 class="title">Fiscal Year:</h3>
            <div class="column first">
              <div class="field">
                <p class="control">
                  <input @input="calculateFiscalYear" v-model="item.fiscal_year.start_year"
                  name="start_year" v-validate="'required|numeric|min:4|max:4'"
                  :class="{'input': true, 'is-danger': errors.has('start_year') }"
                  type="number" placeholder="Start Year">
                </p>
              </div>
            </div>
            <span class="title">-</span>
            <div class="column last">
              <div class="field">
                <p class="control">
                  <input name="end_year" v-model="item.fiscal_year.end_year" v-validate="'required|numeric'"
                  class="input" type="text" placeholder="End Year" disabled>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="form">
        <div class="loading" v-show="loading">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
        <div class="form-body" v-if="!loading">
          <div class="columns">
            <div class="column">
              <div :class="{'has-error': errors.has('customer') }">
                <label class="label">Customer Name<span class="required">*</span></label>
                <p class="control is-mobile">
                  <FirmNameDropdown></FirmNameDropdown>
                </p>
                <div v-show="errors.has('customer')" class="help is-danger">
                  The Customer Name is required and should contain only letters.
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{'has-error': errors.has('invoice_no') && isChalanValid }">
                <label class="label">Chalan Number<span class="required">*</span></label>
                <p class="control">
                  <input v-model="item.chalan_no" name="invoice_no" v-validate="'required|numeric'"
                  :class="{'input': true, 'is-danger': errors.has('invoice_no') }"
                  @blur="checkChalan" type="number" placeholder="Invoice Number">
                </p>
                <div v-show="errors.has('invoice_no')" class="help is-danger">
                  The Chalan Number is required.
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{'has-error': errors.has('date') }">
                <label class="label">Chalan Date<span class="required">*</span></label>
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

      <div class="main-details" v-if="!loading">
        <h3 class="title">Main Details</h3>
      </div>
    </div>

    <div class="item-details" v-if="!loading">
      <div class="box">
        <div class="upper">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <thead>
                      <tr>
                        <th></th>
                        <th colspan="5">Particulars</th>
                        <th colspan="3">Discount</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th><a v-if="hideInputs2" @click="hideInputs2 = false" class="icon is-small"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </a></th>
                        <th>Name<span class="required">*</span></th>
                        <th>Size<span class="required">*</span></th>
                        <th>Qty<span class="required">*</span></th>
                        <th>Rate<span class="required">*</span></th>
                        <th>Amt</th>
                        <th>Rate</th>
                        <th>Amt</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <thead>

                      <tr v-if="!hideInputs2">
                        <th class="dash">
                          <a @click="hideInputs2 = true" class="icon is-small"> <i class="fa fa-minus" aria-hidden="true"></i> </a>
                        </th>

                        <th class="name">
                          <ProductsNameDropdown></ProductsNameDropdown>
                        </th>
                        <th class="size">
                          <div :class="{'has-error': errors.has('size') }">
                            <p class="control">
                              <input v-model="item.size" :class="{'input': true, 'is-danger': errors.has('size') }"
                              name="size" v-validate="'required'"
                              type="text" placeholder="Size">
                            </p>
                          </div>
                        </th>

                        <th class="quantity">
                          <div :class="{'has-error': errors.has('quantity') }">
                            <p class="control">
                              <input @keyup.enter="addItems" v-model="item.quantity"
                              name="quantity" v-validate="'required|min_value:1'"
                              :class="{'input': true, 'is-danger': errors.has('quantity') }"
                              type="number" placeholder="Quantity">
                            </p>
                          </div>
                        </th>

                        <th class="rate">
                          <div :class="{'has-error': errors.has('price') }">
                            <div class="field has-addons">
                              <p class="control">
                                <input @keyup.enter="addItems" v-model="item.product.price"
                                name="price" v-validate="'required'"
                                :class="{'input': true, 'is-danger': errors.has('price') }"
                                type="number" placeholder="Rate">
                              </p>
                            </div>
                          </div>
                        </th>

                        <th class="amount"> &#8377; {{ getamount.toLocaleString('en-IN') }}</th>

                        <th class="discPerc">
                          <div :class="{'has-error': errors.has('discount_percentage') }">
                            <div class="field has-addons">
                              <p class="control">
                                <input @keyup.enter="addItems" v-model="item.discount_percentage"
                                :class="{'input': true, 'is-danger': errors.has('discount_percentage') }"
                                name="discount_percentage" v-validate="'required'"
                                type="number" placeholder="Rate">
                              </p>
                            </div>
                          </div>
                        </th>

                        <th class="discAmount">&#8377; {{getdiscount_amount}}</th>
                        <th class="taxAmount">&#8377; {{ gettaxable_amount.toLocaleString('en-IN') }}</th>

                      </tr>
                      <tr>
                        <th colspan="8"></th>
                        <th>
                          <p class="field is-pulled-right">
                            <a class="button is-info" @click="addItems">
                              Add &nbsp;<span class="icon is-small">
                                <i class="fa fa-plus"></i>
                              </span>
                            </a>
                          </p>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="item-table">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <thead v-if="items.length != 0">
                      <th></th>
                      <th colspan="5">Particulars</th>
                      <th colspan="3">Discount</th>
                      <th></th>
                    </thead>
                    <thead v-if="items.length != 0">
                      <tr>
                        <th>SR</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amt</th>
                        <th>Rate</th>
                        <th>Amt</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tr v-for="it,index in items">
                      <td>{{index+1}}</td>
                      <td class="prod-name">{{it.product_name}}</td>
                      <td class="prod-size">{{it.size}}</td>
                      <td class="prod-qty">{{it.quantity}}</td>
                      <td class="prod-price">&#8377; {{it.price}}</td>
                      <td class="prod-amt">&#8377; {{it.amount.toLocaleString('en-IN')}}</td>
                      <td class="disc-rate">{{it.discount_percentage}}%</td>
                      <td class="disc-amt">&#8377; {{it.discount_amount}}</td>
                      <td class="taxable-amt">&#8377; {{it.taxable_amount.toLocaleString('en-IN')}}</td>
                      <td class="cross"><a class="icon" @click="removeItem(it, index)">
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </a></td>
                    </tr>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="lower-part-two">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <tbody>
                      <tr>
                        <td>Total Invoice Value:</td>
                        <th> &#8377; {{item.final_total_payable_amount.toLocaleString('en-IN')}} </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <button @click="validateAndMakeChalan" class="button is-success">Submit</button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import Datepicker from 'vue-bulma-datepicker';
import FirmNameDropdown from '@/components/FirmNameDropdown';
import ProductsNameDropdown from '@/components/ProductsNameDropdown';
import LoadingLight from '@/components/LoadingLight';
import dates from '@/packages/date/dates';
var numeral = require( 'numeral' );
export default {
  name: 'chalan',
  props: ['admin_state'],
  components: {
    Datepicker,
    FirmNameDropdown,
    ProductsNameDropdown,
    LoadingLight
  },
  created() {
    this.item.userId = Auth.getUserId();
    // var numeral = require('numeral');
    // var myNumeral =  numeral(1).format('0000');
    this.getLastChalanNumber();
    this.getCurrentFiscalYear();
    // for calculate fiscal year computed property ex: 2018-19
    this.calculateFiscalYear;
    this.userDetails();
    this.getYear = new Date().getFullYear();
    this.getMonth = new Date().getMonth() + 1;
    this.getDate = new Date().getDate();
    this.today = this.getYear + '-' + this.getMonth + '-' + this.getDate;
    this.item.created_at = this.today;
    //firm name
    this.$bus.$on( 'firm_name_change', ( response ) => {
      this.item.firm.firm_name = response.firm.firm_name;
      this.item.firm.firm_id = response.firm.id;
      this.item.firm.state_code = response.firm.state_code;
    } );

    //ProductNameChange
    this.$bus.$on( 'product_name_change', response => {
      this.item.product.hsn_code = response.product.hsn_code;
      this.item.product.product_id = response.product.id;
      this.item.product.product_name = response.product.product_name;
      this.item.product.price = response.product.product_price;
    } );

  },
  data() {
    return {
      bill_items: [],
      items: [],
      item: {
        firm: {
          firm_id: null,
          firm_name: '',
          state_code: null
        },
        admin_state_code: null,
        userId: null,
        chalan_no: '',
        created_at: '',
        size: '',
        quantity: 0,
        amount: 0,
        discount_percentage: 0,
        discount_amount: 0,
        taxable_amount: 0,
        final_taxable_amount: 0,
        total_payable_amount: 0,
        final_total_payable_amount: 0,
        lastInvoiceId: '',
        product: {
          product_id: null,
          hsn_code: null,
          product_name: '',
          price: null,
        },
        fiscal_year: {
          start_year: null,
          end_year: null,
          year: ''
        }
      },
      hideInputs2: false,
      loading: false,
      loadingLight: false,
      isChalanValid: true
    };
  },
  methods: {
    //first, check for validations. and then call a function to add items.
    addItems() {
      this.$validator.validateAll({
        product: this.item.product.product_name,
        size: this.item.size,
        quantity: this.item.quantity,
        price: this.item.product.price,
      }).then((result) => {
        if (result) {
          this.addDataToItems();
        }
        else {
          let toast = this.$toasted.error( 'Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        }
      });
    },

    addDataToItems() {
      this.item.total_payable_amount = this.gettotal_payable_amount();
      let {
        quantity,
        size,
        amount,
        discount_percentage,
        discount_amount,
        taxable_amount,
        total_payable_amount
      } = this.item;
      let {
        product_id,
        hsn_code,
        product_name,
        price
      } = this.item.product;
      //bill_items details
      this.bill_items.push( {
        product_id,
        quantity,
        price,
        size,
        discount_percentage,
        discount_amount
      } );
      //item details
      this.items.push( {
        product_name,
        size,
        quantity,
        price,
        amount,
        discount_percentage,
        discount_amount,
        taxable_amount,
        total_payable_amount
      } );
      this.computed_total_payable_amount();
      this.item.size = '';
      this.item.quantity = 0;
      this.item.discount_percentage = 0;
    },

    computed_total_payable_amount() {
      this.item.final_taxable_amount += this.items[ this.items.length - 1 ].taxable_amount;

      this.item.total_payable_amount = this.item.taxable_amount;
      this.item.total_payable_amount = parseFloat( ( this.item.total_payable_amount ).toFixed( 2 ) );

      this.item.final_total_payable_amount += this.items[ this.items.length - 1 ].taxable_amount;
    },

    removeItem( item, index ) {
      // values update
      this.item.final_taxable_amount -= item.taxable_amount;
      this.item.fcgst_amount -= item.cgst_amount
      this.item.fsgst_amount -= item.sgst_amount;
      this.item.figst_amount -= item.igst_amount;
      this.item.final_total_payable_amount -= item.total_payable_amount;
      // bill_items
      this.bill_items.splice( index, 1 );
      // items
      this.items.splice( index, 1 );
    },

    userDetails() {
      api.userDetails()
      .then( ( response ) => {
        this.item.admin_state_code = response.data.state_code;
      } )
    },

    getLastChalanNumber() {
      this.loading = true;
      // var myNumeral =  numeral(1).format('0000');
      api.getLastChalan()
      .then( response => {
        this.loading = false;
        this.item.chalan_no = response.data.challanNumber
        this.item.fiscal_year.year = response.data.year
      } )
      .catch( error => {
        this.loading = false;
        console.log( error );
      } )
    },

    checkChalan() {
      this.item.chalan_no = +this.item.chalan_no.toString();
      api.checkChalan(this.item.chalan_no, this.item.fiscal_year.year)
      .then( response => {
        if(response.data.message == "proceed") {
          let toast = this.$toasted.success( "Invoice Number available!", {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
          this.isChalanValid = true;
          return true;
        }
        else if(response.data.message == "challan already exists") {
          let toast = this.$toasted.error( 'Something is wrong with the Chalan Number', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
          this.isChalanValid = false;
          return false;
        }
      })
      .catch( error => {
        return false;
        console.log("checkInvoice: ", error);
        let toast = this.$toasted.error( 'Something is wrong with the Chalan Number', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      } )
    },

    validateAndMakeChalan() {
      if ( this.items.length == 0 ) {
        let toast = this.$toasted.error( "No Data!", {
          theme: "outline",
          position: "top-center",
          duration: 3000
        } );
      } else {
        this.makeChalan();
      }
    },

    makeChalan() {
        this.loadingLight = true;
        // api call to submit the bill
        api.createChalan( this.item.userId, this.item.firm.firm_id, this.item.chalan_no,
          this.item.fiscal_year.year, this.item.final_total_payable_amount,
          this.item.created_at, this.bill_items )
          .then( response => {
            this.loadingLight = false;
            let toast = this.$toasted.success( "Bill Creation Successful!", {
              theme: "outline",
              position: "top-center",
              duration: 3000
            } );
            this.$router.push( {
              name: 'PrintChalanTemplate',
              params: {
                chalan_no: response.data.challan_no,
                fiscal_year: response.data.challanYear
              }
            } );
          } )
          .catch( error => {
            this.loadingLight = false;
            console.log( error );
          } )

          //send to another page, with nice invoice template and hit print
          // window.print();

        },
        validate() {
          return this.$validator.validateAll();
        },

        gettotal_payable_amount() {
          this.item.total_payable_amount = this.item.taxable_amount;
          return parseFloat( ( this.item.total_payable_amount ).toFixed( 2 ) );
        },
        getCurrentFiscalYear() {
          this.item.fiscal_year.start_year = dates.getCurrentYear().currentFullYear;
          this.item.fiscal_year.end_year = +dates.getCurrentYear().currentShortYear+1;
          return dates.calculateCurrentFiscalYear();
        },
      },
      computed: {

        getdiscount_amount() {
          this.item.discount_amount = this.item.amount * ( this.item.discount_percentage / 100 );
          return parseFloat( ( this.item.discount_amount ).toFixed( 2 ) );
        },

        getamount() {
          this.item.amount = this.item.quantity * this.item.product.price;
          return parseFloat( ( this.item.amount ).toFixed( 2 ) );
        },

        gettaxable_amount() {
          this.item.taxable_amount = this.item.amount - this.item.discount_amount;
          return parseFloat( ( this.item.taxable_amount ).toFixed( 2 ) );
        },

        calculateFiscalYear() {
          if((this.item.fiscal_year.start_year + '').replace('.', '').length === 4) {
            // }
            // if(this.item.fiscal_year.start_year.toString().length === 4) {
            this.item.fiscal_year.end_year = this.item.fiscal_year.start_year-2000+1;
            this.item.fiscal_year.year = this.item.fiscal_year.start_year + "-" + this.item.fiscal_year.end_year;
            if(this.item.fiscal_year.start_year >= 2000 && this.item.fiscal_year.start_year <= 2008) {
              this.item.fiscal_year.year = this.item.fiscal_year.start_year + "-0" + this.item.fiscal_year.end_year;
            }
          }
          return 0;
        }

      }
    }
    </script>

    <style lang="scss">
    .chalan {
      margin-bottom: 2rem;
      .box {
        padding: 0;
      }

      .item-details {
        .box {
          background: #fbfbfd;
        }
      }

      .top-box {
        margin-bottom: 0;
      }

      .head {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          margin: 0;
        }
        .fiscal-year {
          .title {
            padding-top: 10px;
          }
          .columns {
            margin-left: 0;
            .column {
              max-width: 5rem;
            }
            .column.first {
              padding-right: 0;
              max-width: 6.1rem;
            }
            .column.last {
              padding-left: 0;
              max-width: 3.5rem;
            }
          }
        }
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
      }

      .sr-no1 {
        border-left: solid 1px #ddd;
        max-width: 2.1rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        border-top: solid 1px #ddd;
        text-align: center;
        padding-left: 0.4rem;
      }
      .particulars1 {
        max-width: 26rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        border-top: solid 1px #ddd;
        text-align: center;
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
        text-align: center;
      }
      .cgst {
        max-width: 8rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        border-top: solid 1px #ddd;
        text-align: center;
      }
      .sgst {
        max-width: 8rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        border-top: solid 1px #ddd;
        text-align: center;
      }
      .igst {
        max-width: 8rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        border-top: solid 1px #ddd;
        text-align: center;
      }
      .size {
        max-width: 6rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
      }
      .sr-no {
        border-left: solid 1px #ddd;
        max-width: 2.1rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
        padding-left: 0.6rem;
      }
      .sr-no.edit {
        z-index: 1026;
      }
      .particulars {
        max-width: 15rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
      }
      .qty {
        max-width: 3rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
      }
      .rate {
        max-width: 3rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
      }
      .amount {
        max-width: 5rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
      }
      .total {
        max-width: 5rem;
        border-bottom: solid 1px #ddd;
        border-right: solid 1px #ddd;
        text-align: center;
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

      .table {
        padding: 2rem 1rem 1rem;
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
        display: flex;
        justify-content: flex-end;
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

      td,
      th {
        text-align: center;
      }

      .lower {
        border-top: solid 1px #ddd;
        width: 17rem;
        margin-left: auto;
        padding-right: 1rem;
        padding-left: 0.5rem;
        border-left: solid 1px #ddd;
        border-bottom: solid 1px #ddd;
        .left {}
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

      .zero {
        border: none;
      }

      .dash {
        max-width: 2rem;
        min-width: 2rem;
      }

      .name {
        min-width: 11rem;
        width: 13rem;
      }
      .size {
        min-width: 7rem;
      }
      .quantity {
        min-width: 5rem;
        max-width: 8rem;
      }
      .rate {
        max-width: 6rem;
      }
      .discPerc {
        min-width: 5rem;
        width: 6rem;
        max-width: 7rem;
      }
      .amount {
        min-width: 8rem;
        max-width: 8rem;
      }
      .discAmount {
        min-width: 5rem;
        max-width: 5rem;
      }

      .taxAmount {
        min-width: 8rem;
        max-width: 8rem;
      }

      .loading {
        padding: 1rem;
      }

      .cross {
        max-width: 1.5rem;
        min-width: 2rem;
      }

      .prod-name {
        min-width: 12rem;
        max-width: 16rem;
      }

      .prod-size {
        min-width: 3rem;
        max-width: 5rem;
      }

      .prod-qty {
        min-width: 3rem;
        max-width: 5rem;
      }

      .prod-price {
        min-width: 4rem;
        max-width: 5rem;
      }

      .prod-amt {
        min-width: 1rem;
        max-width: 5rem;
      }

      .disc-rate {
        min-width: 1rem;
        max-width: 3rem;
      }

      .disc-amt {
        min-width: 1rem;
        max-width: 3rem;
      }

      .taxable-amt {
        min-width: 1rem;
        max-width: 3rem;
      }

      .middle-box {
        margin-bottom: 1rem;
      }

      .upper {
        .tile.is-parent {
          padding: 0;
        }
      }

      .add-new {
        text-align: left;
      }

      .item-table {
        margin-top: 1rem;
        .tile.is-parent {
          padding: 0;
        }
      }

      .button.is-info {
        background-color: #dc6932;
      }

    }
    </style>
