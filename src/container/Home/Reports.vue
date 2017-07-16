<template lang="html">
  <div class="reports">
    <div class="box">
      <div class="head-report">
        <h3 class="title has-text-centered">Reports</h3>
      </div>

      <div class="options">
        <div class="columns">
          <div class="column is-3 is-multiline">
            <div class="field">
              <label class="label">Select</label>
              <p class="control">
                <span class="select">
                  <select v-model="select">
                    <option value=''>Select dropdown</option>
                    <option value="date">Date</option>
                    <option value="invoice_number">Invoice Number</option>
                    <option value="firm_name">Firm Name</option>
                    <option value="customer_name">Customer Name</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div class="column is-5">
            <div class="date" v-if="select == 'date'">
              <div class="field">
                <label class="label">Start Date</label>
                <p class="control">
                  <datepicker v-model="date1" v-validate="'required'" placeholder="Select Start Date"
                  :config="{ dateFormat: 'Y-m-d' }" name="date" :class="{'input': true, 'is-danger': errors.has('date') }">
                </datepicker>
              </p>
            </div>
            <div class="field">
              <label class="label">End Date</label>
              <p class="control">
                <datepicker v-model="date2" v-validate="'required'" placeholder="Select End Date"
                :config="{ dateFormat: 'Y-m-d' }" name="date" :class="{'input': true, 'is-danger': errors.has('date') }">
              </datepicker>
            </p>
          </div>
        </div>
        <div class="invoice_number" v-if="select == 'invoice_number'">
          <div class="form">
            <label class="label">Invoice Number</label>
            <p class="control">
              <input v-model="invNum" :class="{'input': true, 'is-danger': errors.has('inv_num') }"
              name="inv_num" v-validate="'required'"
              type="text" placeholder="Invoice Number">
            </p>
          </div>
        </div>
        <div class="firm_name" v-if="select == 'firm_name'">
          <div class="form">
            <label class="label">Firm Name</label>
            <p class="control">
              <input v-model="firm_name" :class="{'input': true, 'is-danger': errors.has('firm_name') }"
              name="firm_name" v-validate="'required'"
              type="text" placeholder="Firm Name">
            </p>
          </div>
        </div>
        <div class="customer_name" v-if="select == 'customer_name'">
          <div class="form">
            <label class="label">Customer Name</label>
            <p class="control">
              <input v-model="customer_name" :class="{'input': true, 'is-danger': errors.has('cus_name') }"
              name="cus_name" v-validate="'required'"
              type="text" placeholder="Customer Name">
            </p>
          </div>
        </div>
      </div>
      <div class="column is-2" v-if="select != ''">
        <button class="button is-primary generate-report"> Generate Report </button>
      </div>
    </div>
  </div>

  <div class="reports-body">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <!-- <h4 class="title">Products List</h4> -->
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>SR No</th>
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Party Name</th>
                  <th>Bill Amount</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                  <th>Total</th>
                  <th>GST No</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>SW/17-18/0001</td>
                  <td>1st April</td>
                  <td>Raj Enterprise</td>
                  <td>Rs 30,096.00</td>
                  <td>Rs 250</td>
                  <td>Rs 250</td>
                  <td>Rs 1250</td>
                  <td>Rs 31,500</td>
                  <td>ABC123456Z</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>SW/17-18/0001</td>
                  <td>1st April</td>
                  <td>Raj Enterprise</td>
                  <td>Rs 30,096.00</td>
                  <td>Rs 250</td>
                  <td>Rs 250</td>
                  <td>Rs 1250</td>
                  <td>Rs 31,500</td>
                  <td>ABC123456Z</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>SW/17-18/0001</td>
                  <td>1st April</td>
                  <td>Raj Enterprise</td>
                  <td>Rs 30,096.00</td>
                  <td>Rs 250</td>
                  <td>Rs 250</td>
                  <td>Rs 1250</td>
                  <td>Rs 31,500</td>
                  <td>ABC123456Z</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </div>

  <div>
    <pre>
      {{$data.value}}
    </pre>
  </div>
</div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker';
export default {
  name: 'reports',
  components: {
    Datepicker
  },
  data () {
    return {
      select: '',
      date1: '',
      date2: '',
      invNum: '',
      firm_name: '',
      customer_name: '',
    }
  },
  methods: {
    onSelect (value) {
      this.value = value
    },
    onChange (value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss">
.reports {
  .box {
    padding: 0;
  }
  .head-report {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }
  .vbta-menu.visible {
    position: relative;
  }
  .column.is-5 {
    padding-right: 0;
    width: 35%;
  }
  .options {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
    .generate-report {
      margin-top: 2rem;
    }
    .column.is-3.is-multiline {
      padding-right: 0;
      width: 17%;
      border-right: solid 1px #ddd;
    }
    .date {
      width: 25rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      button {
        margin-top: 2rem;
      }
      .field {
        margin-bottom: 0;
      }
      .control {
        padding-right: 0.5rem;
        // width: 13rem;
        margin: 0;
      }
    }
    .invoice_number, .firm_name, .customer_name {
      width: 25rem;
      display: flex;
      align-items: center;
      .form {
        width: 20rem;
      }
      button {
        margin-top: 2rem;
      }
    }
  }
  .reports-body {
    padding: 1rem;
  }
  .tile.is-parent {
    padding-bottom: 0;
  }
  .practise {
    padding: 1rem;
  }
}
</style>
