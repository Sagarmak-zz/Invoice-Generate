<template lang="html">
  <div class="add-product-modal">

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
          <button class="delete" @click="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Product Name</label>
                <p class="control">
                  <input class="input" name="product_name" v-validate="'required'" type="text" placeholder="Name">
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
                  <input class="input" name="hsn_code" v-validate="'required'" type="email" placeholder="Contact Person Name">
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
                  <input class="input" name="price" v-validate="'required'" type="text" placeholder="Contact Person Name">
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
            <a class="button is-success" @click="validateBeforeSubmit">Save changes</a>
            <a class="button" @click="close">Cancel</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-product-modal',
  created() {
  },
  data() {
    return {

    };
  },
  methods: {
    close() {
      this.$bus.$emit('close');
    },
    validateBeforeSubmit() {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        alert('Yes');
      }
      else {
        alert('No');
      }
    },
  }
}
</script>

<style lang="scss">
.add-product-modal {
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
