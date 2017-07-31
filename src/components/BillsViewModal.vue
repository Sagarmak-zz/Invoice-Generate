<template lang="html">
  <div class="bills-view-modal">

    <a v-if="hidden" @click="hidden=!hidden"  class="card-footer-item">Read</a>

    <div class="modal is-active" v-if="!hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
          <button class="delete" @click="hidden=!hidden"></button>
        </header>
        <section class="modal-card-body">
          Hello {{id}}
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success">Save changes</a>
          <a class="button" @click="hidden=!hidden">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bills-view-modal',
  props: ['id'],
  data() {
    return {
        hidden: true,
    }
  },
  created() {
  },
}
</script>

<style lang="scss">
.bills-view-modal {
z-index: 1026;
}
</style>
