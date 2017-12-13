<template lang="html">
  <div class="dummy-bill">
    <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>
    <div class="box bill-wala-box">
      <div class="head">
        <h3 class="title">Generate Bill</h3>
      </div>

      <div name="top" class="form">
        <div class="loading" v-show="loading">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
        <div class="form-body" v-if="!loading">
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

      <div class="main-details" v-if="!loading">
        <h3 class="title">Main Details</h3>
        <a class="button is-primary" v-if="hideInputs" @click="callMainDetailsAdd()">Edit Taxes</a>
        <a class="button" v-if="!hideInputs" @click="hideInputs=!hideInputs">Hide</a>
      </div>
    </div>

    <form name="middle" class="middle-box box" v-if="!hideInputs">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
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
                    <th>&#8377; {{ getcgst_amount }}</th>
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
                    <th>&#8377; {{ getsgst_amount }}</th>
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
                    <th>&#8377; {{ getigst_amount }}</th>
                    <th>
                      &#8377; {{Math.round((item.cgst_amount + item.sgst_amount + item.igst_amount) * 100) / 100}}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </article>
        </div>
      </div>
    </form>

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
                        <th>Name</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Rate</th>
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
                        <th class="name"><ProductsNameDropdown></ProductsNameDropdown></th>
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
                          <div :class="{'has-error': errors.has('qty') }">
                            <p class="control">
                              <input @keyup.enter="addItemData" v-model="item.quantity" :class="{'input': true, 'is-danger': errors.has('qty') }"
                              name="qty" v-validate="'required'"
                              type="number" placeholder="Quantity">
                            </p>
                          </div>
                        </th>
                        <th class="rate">
                          <div :class="{'has-error': errors.has('price') }">
                            <div class="field has-addons">
                              <p class="control">
                                <input @keyup.enter="addItemData" v-model="item.product.price" :class="{'input': true, 'is-danger': errors.has('price') }"
                                name="price" v-validate="'required'"
                                type="number" placeholder="Rate">
                              </p>
                            </div>
                          </div>
                        </th>
                        <th class="amount"> &#8377; {{ getamount }}</th>
                        <th class="discPerc">
                          <div :class="{'has-error': errors.has('discount_percentage') }">
                            <div class="field has-addons">
                              <p class="control">
                                <input @keyup.enter="addItemData" v-model="item.discount_percentage" :class="{'input': true, 'is-danger': errors.has('discount_percentage') }"
                                name="discount_percentage" v-validate="'required'"
                                type="number" placeholder="Rate">
                              </p>
                          </div>
                        </div>
                      </th>
                      <th class="discAmount">&#8377; {{getdiscount_amount}}</th>
                      <th class="taxAmount">&#8377; {{ gettaxable_amount }}</th>
                    </tr>
                    <tr v-if="!hideInputs2">
                      <th></th>
                      <th>CGST ({{item.cgst_percentage}}%) :
                      &#8377; {{ getcgst_amount }}</th>

                      <th>SGST ({{item.sgst_percentage}}%) :
                      &#8377; {{ getsgst_amount }}</th>

                      <th>IGST ({{item.igst_percentage}}%) :
                      &#8377; {{ getigst_amount }}</th>

                      <th colspan="2"> Total Tax Amount:
                        &#8377; &#8377; {{Math.round((item.cgst_amount + item.sgst_amount + item.igst_amount) * 100) / 100}}
                      </th>

                      <th colspan="2">Total :
                        &#8377;{{ gettotal_payable_amount }}
                      </th>

                      <th>
                        <p class="field is-pulled-right">
                          <a class="button" @click="addItemData">
                            Add &nbsp;<span class="icon is-small">
                              <i class="fa fa-plus"></i>
                            </span>
                          </a>
                        </p></th>
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
                        <td class="prod-amt">&#8377; {{it.amount}}</td>
                        <td class="disc-rate">{{it.discount_percentage}}%</td>
                        <td class="disc-amt">&#8377; {{it.discount_amount}}</td>
                        <td class="taxable-amt">&#8377; {{it.taxable_amount}}</td>
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
import LoadingLight from '@/components/LoadingLight';
var numeral = require( 'numeral' );
export default {
  name: 'dummy-bill',
  props: [ 'admin_state' ],
  components: {
    Datepicker,
    FirmNameDropdown,
    ProductsNameDropdown,
    LoadingLight
  },
  created() {
    // var numeral = require('numeral');
    // var myNumeral =  numeral(1).format('0000');
    this.getLastBillInvoiceNumber();
    this.userDetails();
    this.decodeToken();
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
      if ( this.item.firm.state_code == this.item.admin_state_code ) {
        //2.5% sgst and cgst
        this.item.sgst_percentage = 2.5;
        this.item.cgst_percentage = 2.5;
        this.item.igst_percentage = 0;
      } else {
        //5% igst
        this.item.sgst_percentage = 0;
        this.item.cgst_percentage = 0;
        this.item.igst_percentage = 5;
      }
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
        cgst_percentage: 0,
        cgst_amount: 0,
        fcgst_amount: 0,
        sgst_percentage: 0,
        sgst_amount: 0,
        fsgst_amount: 0,
        igst_percentage: 0,
        igst_amount: 0,
        figst_amount: 0,
        total_payable_amount: 0,
        ftotal_payable_amount: 0,
        lastInvoiceId: '',
        product: {
          product_id: null,
          hsn_code: null,
          product_name: '',
          price: null,
        },
      },
      bill_detail: [],
      items: [],
      hideInputs: true,
      hideInputs2: false,
      loading: false,
      loadingLight: false
    };
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode( Auth.getToken() );
      this.item.user_id = decoded.sub;
    },

    addItemData() {
      //validate first
      if ( this.item.quantity == 0 ) {
        let toast = this.$toasted.error( 'The Quantity should be greater than 0.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      } else {
        this.$validator.validateAll( {
            //item name
            'size': this.item.size,
            // 'price': this.item.product.price,
          } )
          .then( result => {
            if ( result == false ) {
              // validation failed.
              let toast = this.$toasted.error( 'Please fill in the details.', {
                theme: "outline",
                position: "bottom-center",
                duration: 3000
              } );
            } else {
              // success stuff.
              this.addDataToItems();
            }
          } ).catch( ( error ) => {
            console.log( error );
            // something went wrong (non-validation related).
            let toast = this.$toasted.error( 'Please fill in the details.', {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
          } );
      }
    },

    removeItem( it, index ) {
      // values update
      this.item.ftaxable_amount -= it.taxable_amount;
      this.item.fcgst_amount -= it.cgst_amount
      this.item.fsgst_amount -= it.sgst_amount;
      this.item.figst_amount -= it.igst_amount;
      this.item.ftotal_payable_amount -= it.total_payable_amount;
      // bill_detail
      this.bill_detail.splice( index, 1 );
      // items
      this.items.splice( index, 1 );
    },

    computed_total_payable_amount() {
      var x; //for length
      for ( x in this.items ) {
        // console.log(this.items[this.items.length-1]);
        this.item.ftaxable_amount += this.items[ this.items.length - 1 ].taxable_amount;
        this.item.fcgst_amount += this.items[ this.items.length - 1 ].cgst_amount;
        this.item.fsgst_amount += this.items[ this.items.length - 1 ].sgst_amount;
        this.item.figst_amount += this.items[ this.items.length - 1 ].igst_amount;
        this.item.ftotal_payable_amount += this.items[ this.items.length - 1 ].total_payable_amount;
        break;
      }
    },

    validateAndCallApi() {
      if ( this.items.length == 0 ) {
        let toast = this.$toasted.error( "No Data!", {
          theme: "outline",
          position: "top-center",
          duration: 3000
        } );
      } else {
        this.callApi();
      }
    },
    validate() {
      return this.$validator.validateAll();
    },
    callApi() {
      this.loadingLight = true;
      //api call to submit the bill
      api.createBill( this.item.user_id, this.item.firm.firm_id, this.item.invoice_no,
          this.item.ftaxable_amount, this.item.sgst_percentage, this.item.fsgst_amount,
          this.item.cgst_percentage, this.item.fcgst_amount, this.item.igst_percentage, this.item.figst_amount,
          this.item.ftotal_payable_amount, this.item.created_at, this.bill_detail )
        .then( response => {
          this.loadingLight = false;
          let toast = this.$toasted.success( "Bill Creation Successful!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
          this.$router.push( {
            name: 'Sample',
            params: {
              invoice_no: response.data.invoice_no
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

    deleteItem( indexNo ) {
      this.dataArr.splice( indexNo, 1 );
      this.bill_detail.splice( indexNo, 1 );
      this.calculateAmount();
    },
    userDetails() {
      api.userDetails()
        .then( ( response ) => {
          this.item.admin_state_code = response.data.state_code;
        } )
    },
    callMainDetailsAdd() {
      this.hideInputs = !this.hideInputs;
    },

    addDataToItems() {
      let {
        quantity,
        size,
        amount,
        discount_percentage,
        discount_amount,
        taxable_amount,
        cgst_percentage,
        cgst_amount,
        sgst_percentage,
        sgst_amount,
        igst_percentage,
        igst_amount,
        total_payable_amount
      } = this.item;
      let {
        product_id,
        hsn_code,
        product_name,
        price
      } = this.item.product;
      //bill_detail complete
      this.bill_detail.push( {
        product_id,
        quantity,
        price,
        size,
        discount_percentage,
        discount_amount
      } );
      //item detail complete
      this.items.push( {
        product_name,
        size,
        quantity,
        price,
        amount,
        discount_percentage,
        discount_amount,
        taxable_amount,
        cgst_percentage,
        cgst_amount,
        sgst_percentage,
        sgst_amount,
        igst_percentage,
        igst_amount,
        total_payable_amount
      } );
      this.computed_total_payable_amount();
      this.hideInputs = true;
      this.item.size = '';
      this.item.quantity = 0;
      this.item.discount_percentage = 0;
    },

    getLastBillInvoiceNumber() {
      // this.loading = true;
      // var myNumeral =  numeral(1).format('0000');
      api.getLastBill()
        .then( response => {
          this.loading = false;
          if ( isNaN( parseInt( response.data ) ) == true ) {
            this.item.invoice_no = numeral( 1 ).format( '0000' );
          } else {
            this.item.invoice_no = numeral( response.data ).format( '0000' );
          }
        } )
        .catch( error => {
          console.log( error );
        } )
    }
  },
  computed: {

    getcgst_amount() {
      this.item.cgst_amount = ( this.item.cgst_percentage / 100 ) * this.item.taxable_amount;
      return parseFloat( ( this.item.cgst_amount ).toFixed( 2 ) );
    },

    getsgst_amount() {
      this.item.sgst_amount = ( this.item.sgst_percentage / 100 ) * this.item.taxable_amount;
      return parseFloat( ( this.item.sgst_amount ).toFixed( 2 ) );
    },

    getigst_amount() {
      this.item.igst_amount = ( this.item.igst_percentage / 100 ) * this.item.taxable_amount;
      return parseFloat( ( this.item.igst_amount ).toFixed( 2 ) );
    },

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

    gettotal_payable_amount() {
      this.item.total_payable_amount = this.item.taxable_amount + this.item.cgst_amount + this.item.sgst_amount + this.item.igst_amount;
      return parseFloat( ( this.item.total_payable_amount ).toFixed( 2 ) );
    }

  }
}
</script>

<style lang="scss">
.dummy-bill {
    margin-bottom: 2rem;
    .box {
        padding: 0;
    }

    .item-details {
        .box {
            background: #fbfbfd;
        }
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

    .box {
        border-radius: 0;
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

}
</style>
