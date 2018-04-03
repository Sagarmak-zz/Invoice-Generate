<template lang="html">
  <div class="chalan-template">
    <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

    <div class="template-head">
      <div class="template-head-header">
        <router-link :to="{name:'History'}" class="icon"><i class="fa fa-arrow-left" aria-hidden="true"></i></router-link>
        <h1 class="title">Chalan Template</h1>
      </div>
      <router-link :to="{ name:'PrintChalanTemplate',
      params: {
        chalan_no: chalan_no,
        fiscal_year: fiscal_year
        } }" class="button is-primary">Print</router-link>
      </div>

      <div class="box a5size">
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
                        <tr>
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
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>%</th>
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
                          <td>{{(products.quantity * products.price).toLocaleString('en-IN') }}</td>
                          <td>{{products.discount_percentage}}</td>
                          <td>{{products.discount_amount}}</td>
                          <td>{{((products.quantity * products.price) - products.discount_amount).toLocaleString('en-IN') }}</td>
                        </tr>

                        <tr>
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
            <div class="part-two">

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
      name: "chalan-template",
      // updated() {
      //   window.print();
      // },
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
    .chalan-template {
      @media print {
        .box {
          box-shadow: none;
        }
      }

      .template-head {
        background-color: white;
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
