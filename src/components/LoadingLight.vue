<template lang="html">
<div class="loading-light">
  <div class="add-product-modal">

    <div class="modal is-active">
      <div class="modal-background"></div>
      <div v-if="laoderName == 'BounceLoader'">
        <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
      </div>
      <!-- <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
<grid-loader :loading="loading" :color="color" :size="size"></grid-loader>
<clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
<rise-loader :loading="loading" :color="color" :size="size"></rise-loader>
<beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
<sync-loader :loading="loading" :color="color" :size="size"></sync-loader>
<rotate-loader :loading="loading" :color="color" :size="size"></rotate-loader>
<fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>
<pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
<square-loader :loading="loading" :color="color" :size="size"></square-loader>
<scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>
<skew-loader :loading="loading" :color="color" :size="size"></skew-loader>
<moon-loader :loading="loading" :color="color" :size="size"></moon-loader>
<ring-loader :loading="loading" :color="color" :size="size"></ring-loader>
<dot-loader :loading="loading" :color="color" :size="size"></dot-loader> -->
    </div>
  </div>
</div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

export default {
  name: 'loading-light',

  props: [ 'name' ],

  created() {
    this.laoderName = this.name;
  },

  data() {
    return {
      size: '60px',
      color: '#5dc596',
      width: '4px',
      loading: true,
    }
  },


  components: {
    BounceLoader
  }
}
</script>

<style lang="scss">
.loading-light {
    z-index: 1030;
}
</style>
