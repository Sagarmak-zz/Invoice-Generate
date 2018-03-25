<template>
  <div class="hide-seek-product">

    <form @submit.prevent="validateBeforeSubmit">
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Product Name</label>
            <p class="control">
              <input v-model="product.product_name" v-validate="'required'" name="product_name"
              class="input" type="text" placeholder="Product Name">
            </p>
            <div v-show="errors.has('product_name')" class="help is-danger">
              The Product Name is required.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">HSN Code</label>
            <p class="control">
              <input v-model="product.hsn_code" v-validate="'required'" name="hsn_code"
              class="input" type="text" placeholder="HSN Code">
            </p>
            <div v-show="errors.has('hsn_code')" class="help is-danger">
              The HSN Code is required.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Price</label>
            <p class="control">
              <input v-model="product.product_price" v-validate="'required'" name="product_price"
              class="input" type="number" placeholder="Price">
            </p>
            <div v-show="errors.has('product_price')" class="help is-danger">
              The Price is required.
            </div>
          </div>
        </div>

      </div>
      <div class="button-form">
        <button class="button is-primary">Save</button>
      </div>

    </form>
  </div>

</template>
<script>
export default {

  name: 'add-product-flash',
  created() {
  },
  data() {
    return {
      product: {
        product_name: '',
        hsn_code: '',
        product_price: null
      },
    };
  },

  methods: {
    validateBeforeSubmit(event) {
      this.validate()
      if (!this.errors.any()) {
        this.$bus.$emit('add-product-flash', { product: this.product });
        this.product_name = '';
        this.hsn_code = '';
        this.product_price = null;
      } else {
        console.log(this.errors);
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        });
      }
    },
    validate() {
      this.$validator.validateAll();
    }
  },
  computed: {
    isFormValid() {

      // return this.fields.product_name.valid && this.fields.hsn_code.valid && this.fields.product_price.valid
      return Object.keys(this.fields).some(
        key => {
          return this.fields.product_name.valid && this.fields.hsn_code.valid && this.fields.product_price.valid;
        });
      },

    },

  }

  </script>
  <style lang="scss">
  .button-form {
    display: flex;
    justify-content: flex-end;
  }

  </style>
