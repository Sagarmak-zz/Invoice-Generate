<template lang="html">
  <div class="extra-modal">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Item</p>
          <button class="delete" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">

        </section>
        <footer class="modal-card-foot">
          <div class="">
            <a class="button is-success">Save changes</a>
            <a class="button" v-on:click="$emit('close')">Cancel</a>
          </div>
          <h1 class="title is-4 is-pulled-right	is-right"><strong>Item Amount:
            &#8377;</strong></h1>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'extra-modal',

}
</script>

<style lang="scss">
,extra-modal {

}
</style>
