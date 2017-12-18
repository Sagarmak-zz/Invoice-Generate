<template lang="html">
  <div class="reports">
    <div class="box">
      <div class="head-report nodisplay">
        <h3 class="title">Reports</h3>
        <button class="button is-primary" v-if="data.length" @click="printReports">Print</button>
      </div>

      <div class="options nodisplay">
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
                  <datepicker v-model="start_date" v-validate="'required'" placeholder="Select End Date"
                  :config="{ dateFormat: 'Y-m-d' }" name="start_date" :class="{'input': true, 'is-danger': errors.has('start_date') }">
                  </datepicker>
                </p>
              </div>
              <div class="field">
                <label class="label">End Date</label>
                <p class="control">
                  <datepicker v-model="end_date" v-validate="'required'" placeholder="Select End Date"
                  :config="{ dateFormat: 'Y-m-d' }" name="end_date" :class="{'input': true, 'is-danger': errors.has('end_date') }">
                  </datepicker>
                </p>
              </div>
              <div class="field" v-if="select != ''">
                <button @click="generateDateReport()" class="button is-primary generate-report"> Generate Report </button>
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
        </div>
      </div>

      <div class="reports-body">
        <div v-if="!noData">
          <h1 class="title nodisplay" v-if="select == 'date'">Dates Between {{start_date}} and {{end_date}}</h1>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="d,index in data">
                      <td>{{index+1}}</td>
                      <td>{{d.invoice_no}}</td>
                      <td>{{moment(d.created_at.date).format('D/MM/YYYY')}}</td>
                      <td>{{d.firm_name}}</td>
                      <td>Rs {{d.taxable_amount}}</td>
                      <td>Rs {{d.cgst_amount}}</td>
                      <td>Rs {{d.sgst_amount}}</td>
                      <td>Rs {{d.igst_amount}}</td>
                      <td>Rs {{d.total_payable_amount}}</td>
                      <td>NOGSTNOGSTNOGST</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="loading" v-show="loading">
        <span class="title is-4">Please wait while we load the data...</span>
        <div class="fa fa-spinner fa-spin"> </div>
      </div>

      <div v-if="noData && !loading">
        <span class="title">No Data present at the Moment!</span>
      </div>
    </div>


    </div>

  </div>
</template>

<script>
import api from '@/api/main';
import Datepicker from 'vue-bulma-datepicker';
export default {
  name: 'reports',
  created() {

  },
  data() {
    return {
      select: '',
      start_date: '',
      end_date: '',
      invNum: '',
      firm_name: '',
      customer_name: '',
      noData: true,
      data: [],
      loading: false
    }
  },
  methods: {
    generateDateReport() {
      this.loading = true;
      this.$validator.validateAll()
      if ( !this.errors.any() ) {
        this.date();
      } else {
        let toast = this.$toasted.error( 'Please fill in the Dates first.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    },
    date() {
      api.betweenDate( this.start_date, this.end_date )
        .then( response => {
          this.loading = false;
          console.log( "Date between: ", response );
          if ( response.data.message == 'Data not found' ) {
            //no data present
            this.noData = true;
            let toast = this.$toasted.show( 'No Data Found', {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
          } else {
            //data present
            this.data = response.data;
            this.noData = false;
          }
        } )
        .catch( error => {
          console.log( error );
        } )
    },

    onSelect( value ) {
      this.value = value;
    },
    onChange( value ) {
      this.value = value;
    },

    printReports() {
      window.print();
    }
  },
  computed: {
    sortDateWise() {
      return this.bills.reverse();
    }
  },
  components: {
    Datepicker
  },
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            margin: 0;
        }
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
            width: 30rem;
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
        .customer_name,
        .firm_name,
        .invoice_number {
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

    @media print {
        .nodisplay {
            display: none;
        }
        .box {
            margin: 0;
            padding: 0;
            border: none;
            // display: none;
        }
        .tile.is-parent {
            padding: 0;
            margin: 0;
        }

        .table.is-bordered.is-striped.is-narrow {
            margin: 0;
        }
        .reports-body {
            border: none;
        }
        .box {
            background: none;
            box-shadow: none;
        }
    }

}
</style>
