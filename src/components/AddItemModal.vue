<template lang="html">
  <div class="bill-modal">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
          <button class="delete" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">
          <div class="main-det">
            <div class="columns">
              <div class="column flex">
                <div class="flex">
                  <div :class="{'has-error': errors.has('particular') }">
                    <label class="label">Particulars</label>
                    <p class="control">
                      <ProductsNameDropdown></ProductsNameDropdown>
                    </p>
                    <div v-show="errors.has('particular')" class="help is-danger">
                      The Particulars is required.
                    </div>
                  </div>
                </div>
                <a @click="showItemModal = true" class="icon is-medium">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  <AddProductModal v-if="showItemModal"></AddProductModal>
                </a>
              </div>
              <div class="column">
                <div :class="{'has-error': errors.has('hsn') }">
                  <label class="label">HSN Code</label>
                  <p class="control">
                    <input v-model="hsncode" :class="{'input': true, 'is-danger': errors.has('hsn') }"
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
                    <input v-model="size" :class="{'input': true, 'is-danger': errors.has('size') }"
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
                    <input @keyup.enter="validateAndAddItemDetails" v-model="quantitys" :class="{'input': true, 'is-danger': errors.has('qty') }"
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
                      <input v-model="rate" :class="{'input': true, 'is-danger': errors.has('rate') }"
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
            <div class="columns discount-modal">
              <div class="column">
                <div :class="{'has-error': errors.has('drate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input @keyup.enter="validateAndAddItemDetails" v-model="discRate" :class="{'input': true, 'is-danger': errors.has('drate') }"
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
            <div class="columns tag-title">
              <div class="column">
                <h3 class="title is-4 has-text-centered">CGST</h3>
              </div>
              <div class="column">
                <h3 class="title is-4  has-text-centered">SGST</h3>
              </div>
              <div class="column">
                <h3 class="title is-4  has-text-centered">IGST</h3>
              </div>
            </div>
            <div class="columns taxes-billing">
              <div class="column">
                <div :class="{'has-error': errors.has('cgstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="cgstRate" :class="{'input': true, 'is-danger': errors.has('cgstRate') }"
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
                <div :class="{'has-error': errors.has('sgstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="sgstRate" :class="{'input': true, 'is-danger': errors.has('sgstRate') }"
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
                <div :class="{'has-error': errors.has('igstRate') }">
                  <label class="label">Rate</label>
                  <div class="field has-addons">
                    <p class="control">
                      <input v-model="igstRate" :class="{'input': true, 'is-danger': errors.has('igstRate') }"
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
            <a class="button is-success" @click="validateAndAddItemDetails">Save changes</a>
            <a class="button" v-on:click="$emit('close')">Cancel</a>
          </div>
          <h1 class="title is-4 is-pulled-right	is-right"><strong>Item Amount:
            &#8377;{{payableAmount}}</strong></h1>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal';
import ProductsNameDropdown from '@/components/ProductsNameDropdown';
export default {
  name: 'bill-modal',
  props: ['cgst', 'sgst', 'igst'],
  components: {
    AddProductModal,
    ProductsNameDropdown
  },
  created() {
    this.cgstRate = this.cgst;
    this.sgstRate = this.sgst;
    this.igstRate = this.igst;
    this.$bus.$on('close', () => {
      this.showItemModal = false;
    });
    this.$bus.$on('product_name_change', (data) => {
      this.product_name = data.product.product_name;
      this.product = data.product.id;
      this.hsncode = data.product.hsn_code;
      this.rate = data.product.product_price;
    });
  },
  data() {
    return {
      // data: {
      showItemModal: false,
      srno: null,
      product: null,
      product_name: '',
      hsncode: '',
      size: '',
      quantitys: null,
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
      bill_detail: {
        product_id: null,
        quantity: null,
        price: null,
        size: '',
        discount_percentage: null,
        discount_amount: null
      }
      // }
    };
  },
  methods: {
    validateAndAddItemDetails() {
      this.validate()
      if (!this.errors.any()) {
        this.submitData();
      }
      else {
        //print some error message
      }
    },
    submitData() {
      this.bill_detail.product_id = this.product;
      this.bill_detail.quantity = this.quantitys;
      this.bill_detail.price = this.rate;
      this.bill_detail.size = this.size;
      this.bill_detail.discount_percentage = this.discRate;
      this.bill_detail.discount_amount = this.discAmount;
      this.$bus.$emit('sendItemData', {
        data: this.$data ,
        bill_detail: this.bill_detail,
      });
    },
    validate() {
      return this.$validator.validateAll();
    }
  },
  computed: {
    amountComputed() {
      return this.amount = this.quantitys * this.rate;
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
.bill-modal {
  z-index: 1025;
  .modal-card-body {
    padding: 0;
  }
  .column.flex {
    display: flex;
    .flex {
      width: 25rem;
    }
  }
  .main-det {
    padding-left: 1rem;
    padding-top: 1rem;
  }
  .icon.is-medium {
    margin-top: 2rem;
  }
  // .modal-card-body {
  //   padding: 0;
  // }
  // .discount {
  //   padding: 1rem;
  // }
  .discount-modal {
    padding-left: 1rem;
    padding-top: 0.5rem;
    // padding-right: 0;
    margin: 0;
    // padding-bottom: 0.5rem;
    .column {
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      padding-left: 0;
    }
  }
  .taxes-billing {
    padding-left: 1rem;
    padding-top: 0.5rem;
  }
  .modal-head {
    padding: 0.5rem;
    padding-left: 1rem;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    align-items: center;
    background: whitesmoke;
  }
  .modal-card {
    width: 1000px;
  }
  .modal-card-foot {
    display: flex;
    justify-content: space-between;
  }
  .tag-title {
    margin: 0;
    .column {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-right: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
    }
  }
}
</style>
