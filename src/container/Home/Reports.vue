<template lang="html">
<div class="reports">
  <div class="box">
    <h3 class="title">Reports</h3>
  </div>
</div>
</template>

<script>
import MessageBox from 'vue-msgbox';

export default {
  name: 'reports',
  components: {
    MessageBox
  },
  created() {
    MessageBox("Good job!");// title, message, type
  }
}
</script>

<style lang="scss">
.reports {

}
</style>
