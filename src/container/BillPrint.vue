<template lang="html">
  <div class="test-route">

  </div>
</template>

<script>
export default {
  name: 'test-route',
  created() {
    console.log(this.$route.params);
  }
}
</script>

<style lang="scss">
.test-route {

}
</style>
