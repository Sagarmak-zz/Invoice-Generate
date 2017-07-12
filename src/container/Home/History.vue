<template lang="html">
  <div class="history">
    <div class="box head">
      <h3 class="title top-head">History</h3>
    </div>
    <div class="box body">
      <div class="body-head">
        <h1 class="title is-3">Party Name - Invoice Number - Invoice Date</h1>
        <button class="button is-primary">View</button>
      </div>
      <div class="columns body-titles">
        <div class="column sr-no">SR NO</div>
        <div class="column particulars">Particulars</div>
        <div class="column size">Size</div>
        <div class="column qty">Qty</div>
        <div class="column rate">Rate</div>
        <div class="column amount">Amount</div>
        <div class="column amount">Discount Amount</div>
        <div class="column amount">CGST Amount</div>
        <div class="column amount">SGST Amount</div>
        <div class="column amount">IGST Amount</div>
      </div>
      <div class="body-data">
        <div class="columns">
          <div class="column sr-no">1</div>
          <div class="column particulars">PC Pknit</div>
          <div class="column size">L-XL-XXL</div>
          <div class="column qty">500</div>
          <div class="column rate">80</div>
          <div class="column amount">40000</div>
          <div class="column amount">1200 (3)</div>
          <div class="column amount">970</div>
          <div class="column amount">970</div>
          <div class="column amount">1940</div>
        </div>
        <div class="columns">
          <div class="column sr-no">2</div>
          <div class="column particulars">PC Pknit</div>
          <div class="column size">L-XL-XXL</div>
          <div class="column qty">100</div>
          <div class="column rate">90</div>
          <div class="column amount">9000</div>
          <div class="column amount">180 (2)</div>
          <div class="column amount">441</div>
          <div class="column amount">441</div>
          <div class="column amount">882</div>
        </div>
      </div>
      <div class="body-amount"><span class="is-pulled-right">Total Amount Payable 53264</span></div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a class="card-header-icon">
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
              <br>
              <small>11:09 PM - 1 Jan 2016</small>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a class="card-header-icon">
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
              <br>
              <small>11:09 PM - 1 Jan 2016</small>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a class="card-header-icon">
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
              <br>
              <small>11:09 PM - 1 Jan 2016</small>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history'
}
</script>

<style lang="scss">
.history {

  .box {
    padding: 0;
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
}
</style>
