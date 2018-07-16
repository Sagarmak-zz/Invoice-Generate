<template lang="html">
  <div class="history">

    <div class="box">

      <div class="history-head">
        <div class="one">
          <h3 class="title">Bills:</h3>
        </div>
      </div>

      <div class="bills" v-if="bills.length">
        <div class="list">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child">
                <div class="table-responsive">
                  <table class="table is-bordered is-striped is-narrow">
                    <thead>
                      <tr>
                        <th>SR</th>
                        <th>Bill No</th>
                        <th>Date</th>
                        <th>Party Name</th>
                        <th>Bill Amount</th>
                        <th>SGST</th>
                        <th>CGST</th>
                        <th>IGST</th>
                        <th>Total</th>
                        <th>GST No</th>
                        <th>Print</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="bill,index in bills">
                        <td>{{index+1}}</td>
                        <td>{{bill.invoice_no}}</td>
                        <td v-if="bill.created_at">{{moment(bill.created_at.date).format('DD/MM/YYYY')}}</td>
                        <td>{{bill.firm_name}}</td>
                        <td>Rs {{bill.taxable_amount}}</td>
                        <td>Rs {{bill.cgst_amount}}</td>
                        <td>Rs {{bill.sgst_amount}}</td>
                        <td>Rs {{bill.igst_amount}}</td>
                        <td>Rs {{bill.total_payable_amount}}</td>
                        <td>{{bill.gstNumber}}</td>
                        <td>
                          <router-link class="icon"
                          :to="{ name: 'BillTemplate', params: {
                            invoice_no: bill.invoice_no,
                            fiscal_year: bill.invoiceYear
                            } }">
                            <i class="fas fa-print" aria-hidden="true"></i>
                          </router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="reports-body" v-if="!bills.length">
        No Bills present at the moment
      </div>

    </div>

    <div class="box">
      <div class="history-head">
        <div class="one">
          <h3 class="title">Chalans</h3>
        </div>
      </div>
      <div class="need-padding chalans" v-if="chalans.length">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>SR</th>
                      <th>Chalan No</th>
                      <th>Date</th>
                      <th>Party Name</th>
                      <th>Total</th>
                      <th>Print</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="chalan,index in chalans">
                      <td>{{index+1}}</td>
                      <td>{{chalan.challan_no}}</td>
                      <td v-if="chalan.created_at">{{moment(chalan.created_at.date).format('DD/MM/YYYY')}}</td>
                      <td>{{chalan.firm_name}}</td>
                      <td>&#8377; {{chalan.total_payable_amount}}</td>
                      <td>
                        <router-link class="icon"
                        :to="{ name: 'ChalanTemplate', params: {
                          chalan_no: chalan.challan_no,
                          fiscal_year: chalan.challanYear
                          } }">
                          <i class="fas fa-print" aria-hidden="true"></i>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="reports-body" v-if="!chalans.length">
        No Chalans present at the moment
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import BillsViewModal from '@/components/BillsViewModal';
import ChangeInvoiceType from '@/components/History/ChangeInvoiceType';
import FiscalYearDropdown from '@/components/History/FiscalYearDropdown';
import GridListDropdown from '@/components/History/GridListDropdown';
import Simplert from 'vue2-simplert';
import dates from '@/packages/date/dates';
export default {
  name: 'history',
  data() {
    return {
      type: 'List',
      invoice: {
        invoice_type: 'Chalans',
        isData: true,
        fiscal_year: '',
      },
      bills: [],
      chalans: [],
      fiscal_years: [],
      showBillViewData: false,
      loading: false,
      obj: {
        title: 'Delete!',
        message: 'Are you sure you want to delete this bill?',
        type: 'warning',
        useConfirmBtn: true,
        onClose: this.onClose,
        onConfirm: this.delete,
      },
      deleteBillId: null
    };
  },
  created() {
    this.invoice.fiscal_year = dates.calculateCurrentFiscalYear();
    // to be implemented today
    // this.getHistoryYearsForBills();
    // this.getHistoryYearsForChalans();
    // this.getInvoices();
    this.getAllBills();
    this.getAllChalans();
  },
  methods: {
    getInvoices() {
      if(this.invoice.invoice_type == "Bills") {
        // console.log('Bills');
        this.chalans = [];
        if(this.invoice.fiscal_year == 'All') {
          // console.log('All');
          this.getAllBills();
        }
        else {
          // console.log('Not All');
          this.getBillsByYear(this.invoice.fiscal_year);
        }
      }
      else if (this.invoice.invoice_type == "Chalans") {
        // console.log('Chalans');
        this.bills = [];
        if(this.invoice.fiscal_year == 'All') {
          // console.log('All');
          this.getAllChalans();
        }
        else {
          // console.log('Not All');
          this.getChalansByYear(this.invoice.fiscal_year);
        }
      }
    },

    getAllBills() {
      this.loading = true;
      api.getAllBills().then(response => {
        this.loading = false;
        if ( response.data.message == "No data found" || response.data.message == "bill not found" || response.data.message == "Data not found" ) {
          this.invoice.isData = false;
        }
        else {
          this.bills = response.data;
          this.invoice.isData = true;
        }
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      })
    },

    getBillsByYear(fiscal_year) {
      this.loading = true;
      api.getBillsByYear(fiscal_year).then(response => {
        this.loading = false;
        if ( response.data.message == "No data found" || response.data.message == "bill not found" || response.data.message == "Data not found" ) {
          this.invoice.isData = false;
        }
        else {
          this.bills = response.data;
          this.invoice.isData = true;
        }
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      })
    },

    getAllChalans() {
      this.loading = true;
      api.getAllChalans().then(response => {
        this.loading = false;
        if ( response.data.message == "No data found" || response.data.message == "bill not found" || response.data.message == "Data not found" ) {
          this.invoice.isData = false;
        }
        else {
          this.chalans = response.data;
          this.invoice.isData = true;
        }
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      })
    },

    getChalansByYear(fiscal_year) {
      this.loading = true;
      api.getChalansByYear(fiscal_year).then(response => {
        this.loading = false;
        if ( response.data.message == "No data found" || response.data.message == "bill not found" || response.data.message == "Data not found" ) {
          this.invoice.isData = false;
        }
        else {
          this.chalans = response.data;
          this.invoice.isData = true;
        }
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      })
    },



    askHistoryDelete( bill_id ) {
      this.$refs.simplert.openSimplert( this.obj );
      this.deleteBillId = bill_id;
    },

    delete() {
      this.deleteBill( this.deleteBillId );
    },

    deleteBill( bill_id ) {
      api.deleteBill( bill_id )
      .then( response => {
        if ( response.status == 200 ) {
          this.$toasted.success( 'Bill deleted!', {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
          this.getBill();
        }
      } )
      .catch( error => {
        console.log( error );
      } )
    }
  },
  computed: {
  },
  components: {
    // BillsViewModal
    Simplert,
    ChangeInvoiceType,
    FiscalYearDropdown,
    GridListDropdown
  }
}
</script>

<style lang="scss">
.history {
  height: 100%;
  .box {
    padding: 0;
    margin-bottom: 0.5rem;
  }

  .reports-body {
    padding: 1rem;
  }

  .history-head {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ddd;
    .one {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .change-invoice-type {
        padding-left: 0.5rem;
      }
      .fiscal-year-dropdown {
        padding-left: 0.5rem;
      }
      .button {
        margin-left: 0.5rem;
      }
      .title {
        margin: 0;
      }
    }
  }

  .top-head {
    padding: 1rem;
  }

  .body-head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
    display: flex;
    justify-content: space-between;
    .title {
      margin: 0;
    }
  }

  .body-titles {
    padding-left: 1rem;
    padding-top: 1rem;
  }
  .body-data {
    padding-left: 1rem;
    padding-bottom: 1rem;
  }

  .body-amount {
    padding-bottom: 3rem;
    padding-right: 1rem;
    padding-top: 1rem;
    border-top: solid 1px #ddd;
  }

  .need-padding {
    padding: 1rem;
  }

  .isData {
    padding: 1rem;
  }

  .card-header-title {
    background: lightskyblue;
    display: flex;
    justify-content: space-between;
  }

  .taxes {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .loading {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
  }

  .chalans {
    .card-header-title {
      background: #dc6932;
    }
  }
  .tag.is-warning {
    font-size: 0.9rem;
  }

  .noData {
    padding: 1rem;
    padding-top: 0;
  }

  .bills {
    .list {
      padding: 1rem;
    }
  }

}
</style>
