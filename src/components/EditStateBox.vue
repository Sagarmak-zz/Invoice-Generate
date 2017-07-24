<template>
  <div class="edit-state-modal">
    <a @click="hidden=false" v-if="hidden" class="icon is-small"> <i class="fa fa-pencil-square-o"></i> </a>
    <a @click="hidden=true" v-if="!hidden">Hide Info</a>
    <div class="box" v-if="!hidden">
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
  </div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'edit-state-modal',
  data() {
    return {
      hidden: true
    }
  }
}
</script>
<style lang="scss">
.edit-state-modal {
  z-index: 1026;
  .box {
    margin-top: 10px;
    padding: 0.5rem;

    .round-description {
      // margin-top: 10px;
      padding: 1rem;
    }
  }
}
</style>
