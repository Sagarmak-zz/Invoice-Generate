<template lang="html">
  <div class="edit-bill-modal">
    <a @click="hidden = false" class="icon is-small" v-if="hidden">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </a>


    <div class="modal is-active" v-if="!hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
          <button class="delete" @click="hidden = true"></button>
        </header>
        <section class="modal-card-body">
          <div class="main-det">
            <div class="columns">
              <div class="column">
                <div :class="{'has-error': errors.has('particular') }">
                  <label class="label">Particulars</label>
                  <p class="control">
                    <input v-model="particulars = data.particulars" :class="{'input': true, 'is-danger': errors.has('particular') }"
                    name="particular" v-validate="'required'"
                    type="text" placeholder="Particulars Dropdown">
                  </p>
                  <div v-show="errors.has('particular')" class="help is-danger">
                    The Particulars is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('hsn') }">
                  <label class="label">HSN Code</label>
                  <p class="control">
                    <input v-model="hsncode = data.hsncode" :class="{'input': true, 'is-danger': errors.has('hsn') }"
                    name="hsn" v-validate="'required'"
                    type="text" placeholder="HSN Code">
                  </p>
                  <div v-show="errors.has('hsn')" class="help is-danger">
                    The HSN Code is required.
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div :class="{'has-error': errors.has('size') }">
                  <label class="label">Size</label>
                  <p class="control">
                    <input v-model="size = data.size" :class="{'input': true, 'is-danger': errors.has('size') }"
                    name="size" v-validate="'required'"
                    type="text" placeholder="Size">
                  </p>
                  <div v-show="errors.has('size')" class="help is-danger">
                    The Size is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('qty') }">
                  <label class="label">Quantity</label>
                  <p class="control">
                    <input v-model="quantity = data.quantity" :class="{'input': true, 'is-danger': errors.has('qty') }"
                    name="qty" v-validate="'required'"
                    type="number" placeholder="Quantity">
                  </p>
                  <div v-show="errors.has('qty')" class="help is-danger">
                    The Quantity is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('rate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="rate = data.rate" :class="{'input': true, 'is-danger': errors.has('rate') }"
                      name="rate" v-validate="'required'"
                      type="number" placeholder="Rate">
                    </p>
                  </div>
                  <div v-show="errors.has('rate')" class="help is-danger">
                    The Rate is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('amount') }">
                  <label class="label">Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="amount = amountComputed" :class="{'input': true, 'is-danger': errors.has('amount') }"
                      name="amount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('amount')" class="help is-danger">
                    The Amount is required.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="discount">
            <div class="modal-head">
              <h3 class="title">Discount</h3>
            </div>
            <div class="columns">
              <div class="column">
                <div :class="{'has-error': errors.has('drate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="discRate = data.discRate" :class="{'input': true, 'is-danger': errors.has('drate') }"
                      name="drate" v-validate="'required'"
                      type="number" placeholder="Rate">
                    </p>
                    <p class="control">
                      <a class="button is-static"> % </a>
                    </p>
                  </div>
                  <div v-show="errors.has('drate')" class="help is-danger">
                    The Rate is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('damount') }">
                  <label class="label">Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="discAmount = discountAmount" :class="{'input': true, 'is-danger': errors.has('damount') }"
                      name="damount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('damount')" class="help is-danger">
                    The Amount is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('tamount') }">
                  <label class="label">Taxable Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="discTaxamount = discountTaxableAmount" :class="{'input': true, 'is-danger': errors.has('tamount') }"
                      name="tamount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('tamount')" class="help is-danger">
                    The Taxable Amount is required.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gst">
            <div class="modal-head">
              <h3 class="title">Taxes</h3>
            </div>
            <div class="columns">
              <div class="column">
                <h3 class="title is-4">CGST</h3>
                <div :class="{'has-error': errors.has('cgstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="cgstRate = data.cgstRate" :class="{'input': true, 'is-danger': errors.has('cgstRate') }"
                      name="cgstRate" v-validate="'required'"
                      type="number" placeholder="Rate">
                    </p>
                    <p class="control">
                      <a class="button is-static"> % </a>
                    </p>
                  </div>
                  <div v-show="errors.has('cgstRate')" class="help is-danger">
                    The Rate is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('cgstAmount') }">
                  <label class="label">Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="cgstAmount = cgstTaxAmount" :class="{'input': true, 'is-danger': errors.has('cgstAmount') }"
                      name="cgstAmount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('cgstAmount')" class="help is-danger">
                    The Amount is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <h3 class="title is-4">SGST</h3>
                <div :class="{'has-error': errors.has('sgstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="sgstRate = data.sgstRate" :class="{'input': true, 'is-danger': errors.has('sgstRate') }"
                      name="sgstRate" v-validate="'required'"
                      type="number" placeholder="Rate">
                    </p>
                    <p class="control">
                      <a class="button is-static"> % </a>
                    </p>
                  </div>
                  <div v-show="errors.has('sgstRate')" class="help is-danger">
                    The Rate is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('sgstAmount') }">
                  <label class="label">Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="sgstAmount = sgstTaxAmount" :class="{'input': true, 'is-danger': errors.has('sgstAmount') }"
                      name="sgstAmount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('sgstAmount')" class="help is-danger">
                    The Amount is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <h3 class="title is-4">IGST</h3>
                <div :class="{'has-error': errors.has('igstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="igstRate = data.igstRate" :class="{'input': true, 'is-danger': errors.has('igstRate') }"
                      name="igstRate" v-validate="'required'"
                      type="number" placeholder="Rate">
                    </p>
                    <p class="control">
                      <a class="button is-static"> % </a>
                    </p>
                  </div>
                  <div v-show="errors.has('igstRate')" class="help is-danger">
                    The Rate is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('igstAmount') }">
                  <label class="label">Amount</label>
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static"> &#8377; </a>
                    </p>
                    <p class="control">
                      <input v-model="igstAmount = igstTaxAmount" :class="{'input': true, 'is-danger': errors.has('igstAmount') }"
                      name="igstAmount" v-validate="'required'"
                      type="number" placeholder="Amount">
                    </p>
                  </div>
                  <div v-show="errors.has('igstAmount')" class="help is-danger">
                    The Amount is required.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="">
            <a class="button is-success">Save changes</a>
            <a class="button" @click="hidden = true">Cancel</a>
          </div>
          <h1 class="title is-4 is-pulled-right	is-right"><strong>Item Amount: &#8377;{{payableAmount}}</strong></h1>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-bill-modal',
  props: ['data'],
  created() {
  },
  data() {
    return {
      // data: {
      hidden: true,
      srno: null,
      particulars: '',
      hsncode: '',
      size: '',
      quantity: null,
      rate: null,
      amount: null,
      discRate: 0,
      discAmount: 0,
      discTaxamount: 0,
      cgstRate: 0,
      cgstAmount: 0,
      sgstRate: 0,
      sgstAmount: 0,
      igstRate: 0,
      igstAmount: 0,
      // }
    };
  },
  computed: {
    amountComputed() {
      return this.amount = this.quantity * this.rate;
    },
    discountAmount() {
      return this.discAmount = (this.discRate / 100) * this.amount;
    },
    discountTaxableAmount() {
      return this.discTaxamount = this.amount - this.discAmount;
    },
    cgstTaxAmount() {
      return this.cgstAmount = (this.cgstRate / 100) * this.discTaxamount;
    },
    sgstTaxAmount() {
      return this.sgstAmount = (this.sgstRate / 100) * this.discTaxamount;
    },
    igstTaxAmount() {
      return this.igstAmount = (this.igstRate / 100) * this.discTaxamount;
    },
    payableAmount() {
      return this.discTaxamount + this.cgstAmount + this.sgstAmount + this.igstAmount;
    }
  }
}
</script>

<style lang="scss">
.edit-bill-modal {
  z-index: 1026;
  // .modal-card-body {
  //   padding: 0;
  // }
  // .discount {
  //   padding: 1rem;
  // }
  .modal-head {
    padding-bottom: 1rem;
    border-bottom: solid 1px #ddd;
  }
  .modal-card {
    width: 1000px;
  }
  .modal-card-foot {
    display: flex;
    justify-content: space-between;
  }
}
</style>
