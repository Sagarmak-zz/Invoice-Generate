<template lang="html">
  <div class="add-product">
    <div class="box">
      <div class="head-product">
        <h3 class="title">Add Product</h3>
        <button class="button is-primary" v-if="!showAddProduct" @click="showAddProduct = true">Add</button>
        <button class="button" v-if="showAddProduct" @click="showAddProduct = false">Hide</button>
        <!-- <AddProductModal @close="showAddProductModal = false" v-if="showAddProductModal"></AddProductModal> -->
      </div>
      <div class="hide-seek-product" v-if="showAddProduct">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Product Name</label>
              <p class="control">
                <input v-model="product_name" class="input" name="product_name" v-validate="'required'" type="text" placeholder="Product Name">
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
                <input v-model="hsn_code" class="input" name="hsn_code" v-validate="'required'" type="email" placeholder="HSN Code">
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
                <input @keyup.enter="validateBeforeSubmit()" v-model="product_price" class="input" name="price" v-validate="'required'" type="text" placeholder="Price">
              </p>
              <div v-show="errors.has('price')" class="help is-danger">
                The Price is required.
              </div>
            </div>
          </div>
        </div>
        <div class="button-form">
          <a @click="validateBeforeSubmit()" class="button is-primary">Save</a>
        </div>
      </div>
      <div class="reports" v-if="!noData">
        <div class="tile is-ancestor">
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
      </div>
      <div class="noData" v-if="noData">
        <h1 class="title">No Data at the Moment.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
import AddProductModal from '@/components/AddProductModal';
import EditProductModal from '@/components/EditProductModal';
export default {
  name: 'add-product',
  components: {
    AddProductModal,
    EditProductModal
  },
  created() {
    this.$bus.$on('close', () => {
      this.showAddProductModal = false;
    });
    this.getProducts();
  },
  data() {
    return {
      showAddProductModal: false,
      showAddProduct: false,
      product_name: '',
      hsn_code: '',
      product_price: null,
      products: [],
      showEditProductModal: false,
      noData: false
    };
  },
  methods: {
    getProducts() {
      api.getProducts()
      .then((response) => {
        if(response.data.products) {
          this.products = response.data.products;
          this.noData = false;
        }
        else {
          this.noData = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },

    validateBeforeSubmit() {
      this.validate()
      if (!this.errors.any()) {
        api.addProduct(this.product_name, this.hsn_code, this.product_price)
        .then((response) => {
          if(response.status == 200) {
            this.showAddProduct = false;
            this.getProducts();
            let toast = this.$toasted.success("Product Added Successfully!", {
              theme: "outline",
              position: "top-center",
              duration : 3000
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
      else {
        console.log('Validation Failed');
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
      }
    },
    validate() {
      this.$validator.validateAll();
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
    overflow-x:scroll;
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

  .noData {
    padding: 1rem;
  }
}
</style>
