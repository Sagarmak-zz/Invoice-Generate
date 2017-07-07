<template lang="html">
  <div class="home">
    <div class="navbar">
      <navbar></navbar>
    </div>
    <sidebar></sidebar>
    <div class="app-main">
      <router-view></router-view>
    </div>
    <!--
    //col2
    //col10
    <router-view></router-view> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar
  },

}
</script>

<style lang="scss">
.tile.is-ancestor:last-child {
  margin-bottom: 0;
}
.home {

  .app-sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    padding: 15px 0 50px;
    width: 180px;
    min-width: 45px;
    max-height: 100vh;
    height: calc(100% - 50px);
    z-index: 1024 - 1;
    background: #FFF;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 0.2rem;
  }
  .app-main {
    padding-left: 12rem;
    padding-top: 1rem;
  }
}
</style>
