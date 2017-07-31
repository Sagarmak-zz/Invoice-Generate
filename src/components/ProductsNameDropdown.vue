<template lang="html">
  <div class="products-name-dropdown">
    <div class="" v-if="!message">

      <span :class="{'has-error': errors.has('products'), 'select is-fullwidth': true }">
        <select v-model="product" v-validate="'required|not_in:null'" @change="productChange()" name="products">
          <option value=null>Select dropdown</option>
          <option v-for="pro in products" :value="pro">{{pro.product_name}}</option>
        </select>
      </span>
      <div class="help is-danger" v-show="errors.has('products')">
        {{errors.first('products')}}
      </div>
    </div>
    <div class="box" v-if="message == 'No Products'">
      No Products
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
export default {
  name: 'products-name-dropdown',
  created() {
    this.getProducts();
  },
  data() {
    return {
      product: '',
      product_id: null,
      products: [],
      show: true,
      code: null,
      message: ''
    };
  },
  methods: {
    getProducts() {
      api.getProducts()
      .then((response) => {
        if(response.data.message) {
          console.log(this.message = 'No Products');
        }
        else {
          this.products = response.data.products;
          this.message = null;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },

    productChange() {
      this.$bus.$emit('product_name_change', { product: this.product });
    },
  }
}
</script>

<style lang="scss">
.products-name-dropdown {

}
</style>
