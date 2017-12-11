<template lang="html">
  <div class="edit-product-modal">
    <a v-if="hidden" @click="hidden=!hidden" type="icon is-small"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>

    <div class="modal is-active" v-if="!hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Item</p>
          <button class="delete" @click="hidden=!hidden"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Product Name</label>
                <p class="control">
                  <input v-model="product_name = product_old.product_name" class="input" name="product_name" v-validate="'required'" type="text" placeholder="Product Name">
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
                  <input v-model="hsn_code = product_old.hsn_code" class="input" name="hsn_code" v-validate="'required'" type="email" placeholder="HSN Code">
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
                  <input @keyup.enter="validateAndUpdate()" v-model="product_price = product_old.product_price" class="input" name="price" v-validate="'required'" type="text" placeholder="Price">
                </p>
                <div v-show="errors.has('price')" class="help is-danger">
                  The Price is required.
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="">
            <a class="button is-success" @click="validateAndUpdate()">Update</a>
            <a class="button" @click="hidden=!hidden">Cancel</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/main';
export default {
  name: 'edit-product-modal',
  props: [ 'product' ],
  created() {
    this.product_old = this.product;
    this.product_id = this.product.id;
  },
  data() {
    return {
      hidden: true,
      product_name: '',
      hsn_code: '',
      product_price: null,
      product_old: '',
      product_id: null
    };
  },
  methods: {
    validateAndUpdate() {
      this.validate()
      if ( !this.errors.any() ) {
        api.updateProduct( this.product_id, this.product_name, this.hsn_code, this.product_price )
          .then( ( response ) => {
            if ( response.status == 200 ) {
              this.showAddProduct = false;
              let toast = this.$toasted.success( "Product Updated Successfully!", {
                theme: "outline",
                position: "top-center",
                duration: 3000
              } );
              this.hidden = true;
            }
          } )
          .catch( ( error ) => {
            console.log( error );
          } )
      } else {
        console.log( 'Validation Failed' );
        let toast = this.$toasted.error( 'Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    },
    validate() {
      this.$validator.validateAll();
    }
  }
}
</script>

<style lang="scss">
.edit-product-modal {
    .modal.is-active {
        z-index: 1026;
    }
}
</style>
