<template>
  <v-app>

    <router-view></router-view>

  </v-app>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="stylus">
@import './styles/app';
.application {
  font-family: 'Open Sans', sans-serif;
  
}
</style>