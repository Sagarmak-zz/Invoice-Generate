<template lang="html">
  <div class="history">

    <div class="box">

      <div class="history-head">
        <h3 class="title">History</h3>
        <ChangeInvoiceType :invoice_type.sync="invoice.invoice_type"></ChangeInvoiceType>
      </div>

      <!-- Bills -->
      <div class="columns is-multiline need-padding bills"
      v-if="invoice.invoice_type == 'Bills' && invoice.isData == true">
        <div class="column is-one-third" v-for="bill in bills" v-if="!loading">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span>
                  <span>To,</span>
                  <span>{{bill.firm_name}}</span>
                  <span></span>
                </span>
                <span class="tag is-info is-pulled-right">{{bill.invoice_no}}</span>
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <small>Date Created: <b>{{moment(bill.created_at.date).format('LL')}}</b></small><br>
                <span>Taxable Amount: <b>&#8377;{{bill.taxable_amount}}</b></span> <br>
                <div class="taxes">
                  <span>SGST <b>&#8377;{{bill.sgst_amount}}</b></span>
                  <span>CGST <b>&#8377;{{bill.cgst_amount}}</b></span>
                  <span>IGST <b>&#8377;{{bill.igst_amount}}</b></span> <br>
                </div>
                <span>Total Amount: <b>&#8377;{{bill.total_payable_amount}}</b></span>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name:'BillTemplate',
              params: {
                invoice_no: bill.invoice_no,
                fiscal_year: bill.invoiceYear
                } }" class="card-footer-item">View</router-link>
              <a @click="askHistoryDelete(bill.id)" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
        <div class="loading" v-show="loading">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
      </div>
      <div class="isData" v-if="invoice.invoice_type == 'Bills' && invoice.isData == false">
        <span class="title">No Bills at the Moment!</span>
      </div>

      <!-- Chalan -->
      <div class="columns is-multiline need-padding bills"
      v-if="invoice.invoice_type == 'Chalans' && invoice.isData == true">
        <div class="column is-one-third" v-for="bill in bills" v-if="!loading">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span>
                  <span>To,</span>
                  <span>{{bill.firm_name}}</span>
                  <span></span>
                </span>
                <span class="tag is-info is-pulled-right">{{bill.invoice_no}}</span>
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <small>Date Created: <b>{{moment(bill.created_at.date).format('LL')}}</b></small><br>
                <span>Taxable Amount: <b>&#8377;{{bill.taxable_amount}}</b></span> <br>
                <div class="taxes">
                  <span>SGST <b>&#8377;{{bill.sgst_amount}}</b></span>
                  <span>CGST <b>&#8377;{{bill.cgst_amount}}</b></span>
                  <span>IGST <b>&#8377;{{bill.igst_amount}}</b></span> <br>
                </div>
                <span>Total Amount: <b>&#8377;{{bill.total_payable_amount}}</b></span>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name:'BillTemplate',
              params: {
                invoice_no: bill.invoice_no
                } }" class="card-footer-item">View</router-link>
              <a @click="askHistoryDelete(bill.id)" class="card-footer-item">Delete</a>
            </footer>
          </div>
        </div>
        <div class="loading" v-show="loading">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
      </div>
      <div class="isData" v-if="invoice.invoice_type == 'Chalans' && invoice.isData == false">
        <span class="title">No Chalans at the Moment!</span>
      </div>

    </div>
    <simplert :useRadius="true"
    :useIcon="true"
    ref="simplert">
  </simplert>
</div>
</template>

<script>
import api from '@/api/main';
import BillsViewModal from '@/components/BillsViewModal';
import ChangeInvoiceType from '@/components/History/ChangeInvoiceType';
import Simplert from 'vue2-simplert';
export default {
  name: 'history',
  data() {
    return {
      invoice: {
        invoice_type: 'Bills',
        isData: false,
        history_year: ''
      },
      bills: [],
      chalans: [],
      history_years: [],
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
    // to be implemented today
    // this.getHistoryYearsForBills();
    // this.getHistoryYearsForChalans();
    this.getBill();
  },
  methods: {
    getBill() {
      this.loading = true;
      api.getAllBills()
      .then( response => {
        this.loading = false;
        if ( response.data.message == "No data found" || response.data.message == "bill not found" ) {
          this.invoice.isData = false;
        } else {
          this.invoice.isData = true;
          this.bills = response.data;
        }
      } )
      .catch( error => {
        console.log( error );
      } )
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
    ChangeInvoiceType
  }
}
</script>

<style lang="scss">
.history {
  height: 100%;
  .box {
    padding: 0;
    margin-bottom: 0;
  }

  .reports-body {
    padding: 1rem;
  }

  .history-head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      margin: 0;
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

  .button.is-info {
    background-color: #dc6932;
  }
}
</style>
