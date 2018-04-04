<template lang="html">
  <div class="bill-template">
    <div class="box">
      <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>
      <div class="template-head">
        <div class="template-head-header">
          <router-link :to="{name:'History'}" class="icon"><i class="fa fa-arrow-left" aria-hidden="true"></i></router-link>
          <h1 class="title">Bill Template</h1>
        </div>
        <router-link :to="{ name:'PrintBillTemplate',
        params: {
          invoice_no: invoice_no,
          fiscal_year: fiscal_year
          } }" class="button is-primary">Print</router-link>
      </div>

      <div class="template-body-main">
        <div class="seller">
          <h1 class="title is-3 has-text-centered">{{bill_details.admin_firm}}</h1>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <tbody>
                      <tr v-if="bill_details.admin_gst">
                        <th>GST NO:</th>
                        <td>{{bill_details.admin_gst}}</td>
                      </tr>
                      <tr>
                        <th rowspan="2">Address:</th>
                        <td rowspan="2">
                          {{bill_details.admin_address}}, {{bill_details.admin_cityname}}-{{bill_details.admin_pincode}} </td>
                      </tr>
                      <tr> </tr>
                      <tr>
                        <th>State & Code:</th>
                        <td>{{bill_details.admin_state}} - {{bill_details.admin_state_code}}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>0{{bill_details.admin_landline_number}}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{{bill_details.admin_email}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="invoice">
          <p class="invoice-details-copy"><b>Original Copy</b></p>
          <p class="invoice-head">INVOICE</p>
          <div class="invoice-no-date">
            <span class="invoice-details">Invoice No: {{printableInvoiceNumber}}</span>
            <span class="invoice-details" v-if="bill_details.created_at">Date: {{moment(bill_details.created_at.date).format('D/MM/YYYY')}}</span>
          </div>
          <div class="tile is-ancestor" v-if="bill_details.admin_account_no">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <tbody>
                      <tr>
                        <th>Bank Account Number:</th>
                        <td>{{bill_details.admin_account_no}}</td>
                      </tr>
                      <tr>
                        <th>Bank Branch IFSC:</th>
                        <td>{{bill_details.admin_ifsc_code}}</td>
                      </tr>
                      <tr>
                        <th>Bank Name:</th>
                        <td>{{bill_details.admin_bank_name}}</td>
                      </tr>
                      <tr>
                        <th>Bank Branch Name:</th>
                        <td>{{bill_details.admin_branch_name}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <!-- seller -->
      <!-- buyer -->
      <div class="buyer">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <tbody>
                    <tr>
                      <th>M/S:</th>
                      <td>{{bill_details.firm_name}}</td>
                    </tr>
                    <tr v-if="bill_details.customer_gst">
                      <th>GST NO:</th>
                      <td>{{bill_details.customer_gst}}</td>
                    </tr>
                    <tr>
                      <th>Address:</th>
                      <td>{{bill_details.billing_address}}</td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="table-responsive right-side">
                <table class="table is-bordered is-striped is-narrow">
                  <tbody>
                    <!-- <tr> <th>Agent:</th> <td>Dummy Name</td> </tr> -->
                    <tr v-if="bill_details.billing_landline_number">
                      <th>Phone:</th>
                      <td>{{bill_details.billing_landline_number}}</td>
                    </tr>
                    <tr v-if="bill_details.customer_email">
                      <th>Email:</th>
                      <td>{{bill_details.customer_email}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </div>
      <!-- buyer -->
      <!-- table -->
      <div class="template-body-items">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>SR</th>
                      <th colspan="5">Particulars</th>
                      <th colspan="2">Discount</th>
                      <th>Taxable Amount</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="products, index in bill_details.product_detail">
                      <td>{{index+1}}</td>
                      <td>{{products.product_name}} - {{products.hsn_code}} </td>
                      <td>{{products.size}}</td>
                      <td>{{products.quantity}}</td>
                      <td>{{products.price}}</td>
                      <td>{{products.quantity * products.price }}</td>
                      <td>{{products.discount_percentage}}</td>
                      <td>{{products.discount_amount}}</td>
                      <td>{{(products.quantity * products.price) - products.discount_amount }}</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
        <div class="bottom-details">
          <div class="part-one has-text-centered">
            <div class="blank">
            </div>
            <div class="amount-in-words">
              <p>Total Invoice Amount In Words:</p>
              <p>{{amountInWords}}</p>
            </div>
          </div>
          <div class="tile is-ancestor part-two">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <tbody>
                      <tr>
                        <td>Total Taxable Amount: </td>
                        <th>&#8377; {{bill_details.taxable_amount}}</th>
                      </tr>
                      <tr>
                        <td>CGST: {{bill_details.cgst_percentage}}% </td>
                        <th>&#8377; {{bill_details.cgst_amount}}</th>
                      </tr>
                      <tr>
                        <td>SGST: {{bill_details.sgst_percentage}}% </td>
                        <th>&#8377; {{bill_details.sgst_amount}}</th>
                      </tr>
                      <tr>
                        <td>IGST: {{bill_details.igst_percentage}}% </td>
                        <th>&#8377; {{bill_details.igst_amount}}</th>
                      </tr>
                      <tr>
                        <td>Total Invoice Value: </td>
                        <th>&#8377; {{bill_details.total_payable_amount}}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <!-- table -->
      <!-- bottom -->
      <div class="template-bottom">
        <div class="part-one">
          <span><b>N.B.</b></span>
          <p><b>(1)</b> Interest will be charged @ 18% from the date of bill <b>(2)</b> The Payment of this bill should be made by demand draft of our name duly crossed by payee's A/c. only <b>(3)</b> Goods are sent on your account & risk and according to
            the rules of the Gujarat Garment Manufacturer Association(GGMA).</p>
          <p class="spacing">Subject to Ahmedabad Jurisdiction</p>
        </div>
        <div class="part-two">
          <p>For, {{bill_details.admin_firm}}</p>
          <p class="take-me-to-the-bottom">Authorised Signature</p>
        </div>
      </div>
      <!-- bottom -->
    </div>
  </div>
  </div>
</template>

<script>
  import api from '@/api/main';
  import num2Word from 'num2Word';
  import LoadingLight from '@/components/LoadingLight';
  var numeral = require( 'numeral' );
  export default {
    name: 'bill-template',
    created() {
      this.invoice_no = this.$route.params.invoice_no;
      this.fiscal_year = this.$route.params.fiscal_year;
      console.log(this.invoice_no, this.fiscal_year);
      this.getBillByInvoiceNo();
      this.printableInvoiceNumber = numeral( this.invoice_no ).format( '0000' );
      // var numeral = require('numeral');
      // var myNumeral =  numeral(1).format('0000');
    },
    data() {
      return {
        invoice_no: '',
        fiscal_year: '',
        bill_details: {},
        amountInWords: null,
        loadingLight: false,
        printableInvoiceNumber: ''
      };
    },
    methods: {
      getBillByInvoiceNo() {
        this.loadingLight = true;
        api.getBillByInvoiceNo(this.invoice_no, this.fiscal_year)
          .then(response => {
            this.loadingLight = false;
            if (response.data.invoice_no == this.invoice_no) {
              this.bill_details = response.data;
              this.amountInWords = this.toUpper(num2Word(this.bill_details.total_payable_amount));
            } else {
              // this.$router.push({
              //   name: 'Page404'
              // });
            }
          })
          .catch(error => {
            this.loadingLight = false;
            console.log(error);
          })
      },
      toUpper(str) {
        return str
          .toLowerCase()
          .split(' ')
          .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
          })
          .join(' ');
      }
    },
    components: {
      LoadingLight
    }
  }
</script>

<style lang="scss">
  .bill-template {
    font: -webkit-small-control;
    .template-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #ddd;
      padding: 1rem;
      .template-head-header {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 0.2rem;
        }
      }
    }
    .box {
      padding: 0;
    }
    .template-body-main {
      min-height: 5.6cm;
      max-height: 7cm;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 2px #ddd;
      .tile.is-ancestor {
        .table-responsive {
          .table.is-bordered.is-striped.is-narrow {
            margin-bottom: 0;
          }
        }
      }
    }
    .seller {
      width: 55%;
      .title.is-3 {
        margin: 0;
        padding-bottom: 0.5rem;
        background: whitesmoke;
        font-size: 44px; // font-variant: unicase;
        font-family: "Avenir LT Std 55", Arial, sans-serif;
      }
    }
    .invoice {
      display: flex;
      flex-direction: column;
      p {
        text-align: center;
      }
      .invoice-head {
        color: grey;
        font-weight: 500;
        font-size: -webkit-xxx-large;
      }
      .invoice-details {
        font-size: 0.8rem;
      }
      .invoice-details-copy {
        font-size: 0.8rem;
      }
      .invoice-details.last {
        padding-bottom: 0.2rem;
      }
      .invoice-no-date {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
    .table-responsive {
      // width: 28rem;
    }
    .buyer {
      padding: 1rem 1.5rem;
      border-bottom: solid 2px #ddd;
      display: flex;
      justify-content: space-between;
      .tile.is-ancestor {
        margin-bottom: 0;
      }
      .tile.is-parent {
        padding-bottom: 0;
        .table.is-bordered.is-striped.is-narrow {
          margin-bottom: 0;
        }
      }
      .right-side {
        float: right;
      }
    }
    .template-body-items {
      height: 13cm;
      padding: 1rem 2rem 2rem;
      border-bottom: solid 2px #ddd;
      td,
      th {
        text-align: center;
      }
      .tile.is-ancestor {
        margin-bottom: 0;
      }
      .tile.is-parent {
        padding-bottom: 0;
        .table.is-bordered.is-striped.is-narrow {
          margin: 0;
        }
      }
      .bottom-details {
        display: flex;
        justify-content: space-between;
        .part-one {
          border: solid 1px #ddd;
          width: 60%;
          .blank {
            padding-top: 0.5rem;
            height: 50%;
            border-bottom: solid 1px #ddd;
          }
          .amount-in-words {
            padding-top: 0.5rem;
            height: 50%;
          } // border: solid 1px #ddd;
          // height: fit-content;
          // display: flex;
          // align-items: flex-end;
          // margin-left: 6rem;
          // margin-top: auto;
        }
        .table-responsive {
          width: 100%;
          float: right;
        }
      }
    }
    .template-bottom {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      .part-one {
        max-width: 23rem;
        .spacing {
          padding-top: 1.5rem;
        }
      }
      .part-two {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p {
          font-weight: 700;
        }
      }
    }
  }
</style>
