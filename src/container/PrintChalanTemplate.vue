<template lang="html">
  <div class="print-chalan-template">
    <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>
    <!-- part 1 -->
    <div class="box a5size" v-for="indexMain in 4">
      <div class="template-body-main">

        <div class="top">
          <h1 class="title is-3 has-text-centered">{{bill_details.admin_firm}}</h1>
        </div>
        <div class="bottom">

          <div class="left-buyer">
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
                        <tr>
                          <th>Address:</th>
                          <td>{{bill_details.billing_address}},
                          </td>
                        </tr>
                        <tr>
                          <td class="need-padding" colspan="2">{{bill_details.billing_city}}, {{bill_details.billing_state}}
                            <span v-if="bill_details.billing_pincode">-{{bill_details.billing_pincode}}</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </article>
                </div>
              </div>

            </div>
            <div class="right-invoice-details">

              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <article class="tile is-child">
                    <div class="table-responsive">
                      <table class="table is-bordered is-striped is-narrow">
                        <tbody>
                          <tr>
                            <th class="delivery-chalan" colspan="2">Delivery Chalan</th>
                          </tr>
                          <tr>
                            <th>Chalan No:</th>
                            <td>{{printableChalanNumber}}</td>
                          </tr>
                          <tr v-if="bill_details.created_at">
                            <th>Date:</th>
                            <td>{{moment(bill_details.created_at.date).format('D/MM/YYYY')}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </article>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="template-body-items">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <thead>
                      <tr v-if="indexMain == 1">
                        <th>SR</th>
                        <th colspan="3">Particulars</th>
                        <!-- <th colspan="2">Discount</th> -->
                        <!-- <th>Amount</th> -->
                      </tr>
                      <tr v-if="indexMain != 1">
                        <th>SR</th>
                        <th colspan="5">Particulars</th>
                        <th colspan="2">Discount</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th v-if="indexMain != 1">Rate</th>
                        <th v-if="indexMain != 1">Amount</th>
                        <th v-if="indexMain != 1">%</th>
                        <th v-if="indexMain != 1">Amount</th>
                        <th v-if="indexMain != 1"></th>
                      </tr>
                    </thead>
                    <tbody v-if="bill_details.product_detail">
                      <tr v-for="products, index in bill_details.product_detail">
                        <td>{{index+1}}</td>
                        <td>{{products.product_name}} - {{products.hsn_code}} </td>
                        <td>{{products.size}}</td>
                        <td>{{products.quantity}}</td>
                        <td v-if="indexMain != 1">{{products.price}}</td>
                        <td v-if="indexMain != 1">{{(products.quantity * products.price).toLocaleString('en-IN') }}</td>
                        <td v-if="indexMain != 1">{{products.discount_percentage}}</td>
                        <td v-if="indexMain != 1">{{products.discount_amount}}</td>
                        <td v-if="indexMain != 1">{{((products.quantity * products.price) - products.discount_amount).toLocaleString('en-IN') }}</td>
                      </tr>

                      <tr v-if="bill_details.product_detail.length == 1" v-for="i in 10">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>

                      <tr v-if="bill_details.product_detail.length == 2" v-for="i in 9">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>

                      <tr v-if="bill_details.product_detail.length == 3" v-for="i in 8">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>

                      <tr v-if="bill_details.product_detail.length == 4" v-for="i in 7">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>

                      <tr v-if="bill_details.product_detail.length == 5" v-for="i in 6">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>
                      <tr v-if="bill_details.product_detail.length == 6" v-for="i in 5">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>
                      <tr v-if="bill_details.product_detail.length == 7" v-for="i in 4">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>
                      <tr v-if="bill_details.product_detail.length == 8" v-for="i in 3">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>
                      <tr v-if="bill_details.product_detail.length == 9" v-for="i in 2">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>
                      <tr v-if="bill_details.product_detail.length == 10" v-for="i in 1">
                        <td>&nbsp;</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                        <td v-if="indexMain != 1"></td>
                      </tr>

                      <tr v-if="indexMain != 1">
                        <td colspan="9">
                          <span>Total Invoice Amount In Words:</span>
                          <b>{{amountInWords}}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>

        </div>

        <div class="template-bottom">

          <div class="part-one">

            <p>Subject to Ahmedabad Jurisdiction</p>
            <p>Received By: </p>

          </div>
          <div class="part-two" v-if="indexMain != 1">

            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                      <tbody>
                        <tr>
                          <th>Total Payable Amount:</th>
                        </tr>
                        <tr>
                          <td>&#8377;{{bill_details.total_payable_amount}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </template>

  <script>
  import api from "@/api/main";
  import num2Word from "num2Word";
  import LoadingLight from "@/components/LoadingLight";
  var numeral = require( 'numeral' );
  export default {
    name: "print-chalan-template",
    updated() {
      window.print();
    },
    created() {
      this.chalan_no = this.$route.params.chalan_no;
      this.fiscal_year = this.$route.params.fiscal_year;
      this.getBillByChalanNo();
      this.printableChalanNumber = numeral( this.chalan_no ).format( '0000' );
      // console.log(num2Word('1,234'));
    },
    data() {
      return {
        chalan_no: '',
        fiscal_year: '',
        printableChalanNumber: '',
        bill_details: {},
        amountInWords: null,
        loadingLight: false
      };
    },
    methods: {
      getBillByChalanNo() {
        this.loadingLight = true;
        api.getBillByChalanNo(this.chalan_no, this.fiscal_year)
        .then(response => {
          this.loadingLight = false;
          if (response.data.invoice_no == this.invoice_no) {
            this.bill_details = response.data;
            this.amountInWords = this.toUpper(
              num2Word(this.bill_details.total_payable_amount)
            );
          } else {
            this.loadingLight = false;
            // this.$router.push({
            //   name: "Page404"
            // });
          }
        })
        .catch(error => {
          this.loadingLight = false;
          console.log(error);
        });
      },
      toUpper(str) {
        return str
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
      }
    },
    components: {
      LoadingLight
    }
  };
  </script>

  <style lang="scss">
  .print-chalan-template {
    @media print {
      .box {
        box-shadow: none;
      }
    }

    font: -webkit-small-control;
    .a5size {
      padding: 0;
      // 21 x 14.8 cm
      width: 21cm;
      height: 14.8cm;
    }
    .template-body-main {
      height: 3cm;
      padding: 1rem;
      .tile.is-ancestor {
        .table-responsive {
          .table.is-bordered.is-striped.is-narrow {
            margin-bottom: 0;
          }
        }
      }

      .top {
        border: solid 1px black;
        .title.is-3 {
          margin: 0;
          font-size: 20px; // font-variant: unicase;
          font-family: "Avenir LT Std 55", Arial, sans-serif;
        }
      }

      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: solid 1px black;
        .left-buyer {
          width: 14cm;
          th {
            width: 15%;
          }
          .need-padding {
            padding-left: 5rem;
          }
        }
        .right-invoice-details {
          width: 7cm;
          .delivery-chalan {
            text-align: center;
          }
          th {
            width: 40%;
          }
        }
      }

    }

    .template-body-items {
      height: 8.6cm;
      padding: 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: solid 2px #ddd;
      display: flex;
      flex-direction: column;
      th,
      td {
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
          }
        }
        .table-responsive {
          width: 100%;
          float: right;
        }
      }
    }


    .template-bottom {
      height: 2.5cm;
      padding: 1rem;
      margin: 1rem;
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      border: solid 1px black;
      .part-one {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .part-two {
        width: 30%;
        .tile.is-parent {
          margin-top: 0.5rem;
        }
        th, td {
          text-align: center;
        }
      }
    }
  }
  </style>
