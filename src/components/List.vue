<template lang="html">
<div class="list">
  <li>
    <router-link :to="{ name:route }">
      <span class="icon is-small"> <i :class=icon aria-hidden="true"></i> </span>
      {{name}}
    </router-link>
  </li>
</div>
</template>

<script>
export default {
  name: 'list',
  props: ['name', 'icon', 'route'],
    // icon: {
    //   required: true
    // }
  created() {
  }
}
</script>

<style lang="scss">
.list {

}
</style>
