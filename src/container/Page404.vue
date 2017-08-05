<template lang="html">
  <div class="page-404">
    <div class="box">
      <div class="icon-class">
        <span class="icon"> <i class="fa fa-fort-awesome" aria-hidden="true"></i> </span>
        <p class="title">Page Not Found</p>
      </div>
      <button @click="redirect" class="button is-primary">Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-404',
  methods: {
    redirect() {
      this.$router.push({name:'Dashboard'})
    }
  }
}
</script>

<style lang="scss">
.page-404 {
  width: 50%;
  margin: auto;
  margin-top: 2rem;
  .box {
    display: flex;
    justify-content: space-between;
  }
  .title {
    margin: 0;
  }
  .icon-class {
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 0.3rem;
  }
}
</style>
