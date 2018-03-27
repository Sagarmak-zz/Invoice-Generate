<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
html {
  background-color: whitesmoke;
  span.required {
    color: red;
  }
}
</style>
