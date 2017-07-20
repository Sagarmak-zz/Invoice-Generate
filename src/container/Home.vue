<template lang="html">
  <div class="home">
    <div class="navbar">
      <navbar @logout="logout"></navbar>
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
import Auth from '@/packages/auth/Auth.js';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar
  },
  created() {
    let toast = this.$toasted.success('Welcome!', {
      theme: "outline",
      position: "top-center",
      duration : 3000
    });
  },
  methods: {
    logout() {
      Auth.destroyToken();
      let toast = this.$toasted.show("Successfully Logged Out!", {
        theme: "outline",
        position: "top-center",
        duration : 3000
      });
      this.$router.push({name: 'Login'});
    }
  }
}
</script>

<style lang="scss">
// .tile.is-ancestor:last-child {
//   margin-bottom: 0;
// }
.home {


  .app-main {
    height: 100%;
    padding-left: 12rem;
    padding-top: 1rem;
    margin-right: 1rem;
    margin-bottom: 1.5rem;
  }
}
</style>
