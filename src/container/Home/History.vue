<template lang="html">
  <div class="history">
    <div class="box">
      <div class="history-head">
        <h3 class="title has-text-centered">History</h3>
      </div>
      <!-- <div class="reports-body">
    </div> -->
    <div class="columns is-multiline need-padding" v-if="!noData">
      <div class="column is-one-third" v-for="bill in bills">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <!-- | orderBy sortKey reverse -->
              {{bill.firm_name}}
              {{bill.invoice_no}}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <span>Taxable Amount: <b>&#8377;{{bill.taxable_amount}}</b></span> <br>
              <div class="taxes">
                <span>SGST <b>&#8377;{{bill.sgst_amount}}</b></span>
                <span>CGST <b>&#8377;{{bill.cgst_amount}}</b></span>
                <span>IGST <b>&#8377;{{bill.igst_amount}}</b></span> <br>
              </div>
              <span>Total Amount: <b>&#8377;{{bill.total_payable_amount}}</b></span>
              <br>
              <small>{{moment(bill.created_at.date).format('ddd, MMMM Do YYYY')}}</small>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">View</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="noData" v-if="noData">
      <span class="title">No Bills at the moment</span>
    </div>
    <!-- <pre>
      {{bills}}
    </pre> -->
  </div>
</div>
</template>

<script>
import api from '@/api/main';
export default {
  name: 'history',
  data() {
    return {
      bills: [],
      noData: false
    };
  },
  created() {
    this.getBill();
  },
  methods: {
    getBill() {
      api.getBill()
      .then(response => {
        console.log(response);
        if(response.data.message == "No data found") {
          this.noData = true;
        }
        else {
          this.noData = false;
          this.bills = response.data;
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
}
</script>

<style lang="scss">
.history {
  height: 100%;
  .box {
    padding: 0;
  }

  .reports-body {
    padding: 1rem;
  }

  .history-head {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
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

  .noData {
    padding: 1rem;
  }

  .card-header-title {
    background: lightskyblue
  }

  .taxes {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
