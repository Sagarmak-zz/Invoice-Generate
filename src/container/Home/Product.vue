<template lang="html">
  <div class="add-product">
    <div class="box">

      <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

      <div class="head-product">
        <h3 class="title">Add Product</h3>
        <button class="button is-primary" v-if="!showAddProductFlash" @click="showAddProductFlash = true">Add</button>
        <button class="button" v-if="showAddProductFlash" @click="showAddProductFlash = false">Hide</button>
      </div>

      <AddProductFlash v-if="showAddProductFlash"></AddProductFlash>

      <div class="reports" v-if="!isData">
        <div class="tile is-ancestor" v-if="!loading">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="product-head">
                <h4 class="title">Products List</h4>
                <span>Total Products: <b>{{products.length}}</b></span>
              </div>
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>HSN Code</th>
                      <th>Rate</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product,index in products">
                      <td> {{product.product_name}}</td>
                      <td> {{product.hsn_code}}</td>
                      <td> {{product.product_price}}</td>
                      <td>
                        <a class="icon">
                          <EditProductModal :key="index" :product="product"></EditProductModal>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
        <div class="loading" v-show="loading">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
      </div>
      <div class="isData" v-if="isData">
        <h1 class="title">No Data at the Moment.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import AddProductModal from '@/components/Product/AddProductModal';
import AddProductFlash from '@/components/Product/AddProductFlash';
import EditProductModal from '@/components/EditProductModal';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'add-product',
  components: {
    AddProductModal,
    AddProductFlash,
    EditProductModal,
    LoadingLight
  },
  created() {
    this.getProducts();
    this.$bus.$on( 'close', () => {
      this.showAddProductModal = false;
    } );
    this.getProductFlashData();
  },
  data() {
    return {
      product: {
        product_name: '',
        hsn_code: '',
        product_price: null,
      },
      showAddProductFlash: false,
      products: [],
      showEditProductModal: false,
      isData: false,
      loading: false,
      loadingLight: false
    };
  },
  methods: {
    getProducts() {
      this.loading = true;
      api.getProducts()
      .then( ( response ) => {
        if ( response.data.products ) {
          this.loading = false;
          this.products = response.data.products;
          this.isData = false;
        } else {
          this.isData = true;
        }
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    },
    getProductFlashData() {
      this.$bus.$on('add-product-flash', (data) => {
        this.showAddProductFlash = false;
        this.product.product_name = data.product.product_name;
        this.product.hsn_code = data.product.hsn_code;
        this.product.product_price = data.product.product_price;
        this.addProduct();
      });
    },
    addProduct() {
      this.loadingLight = true;
      api.addProduct( this.product.product_name, this.product.hsn_code, this.product.product_price )
      .then( ( response ) => {
        this.loadingLight = false;
        if ( response.status == 200 ) {
          this.showAddProduct = false;
          this.getProducts();
          let toast = this.$toasted.success( "Product Added Successfully!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
        }
      } )
      .catch( ( error ) => {
        this.loadingLight = false;
        console.log( error );
      } )
    }
  }
}
</script>

<style lang="scss">
.add-product {
  .box {
    padding: 0;
  }
  .head-product {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ddd;
    .title {
      margin: 0;
    }
  }
  .reports {
    // important
    padding: 1rem;
    overflow-x: scroll;
    table-layout: inherit;
  }

  .hide-seek-product {
    border-bottom: solid 1px #ddd;
    .columns {
      padding: 0.3rem;
      margin: 0;
    }
    .button-form {
      padding: 1rem;
      border-top: solid 1px #ddd;
    }
  }

  .product-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    .title {
      margin: 0;
    }
  }

  .isData {
    padding: 1rem;
  }

  .loading {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
  }
}
</style>
