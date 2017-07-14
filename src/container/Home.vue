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
import {firebaseApp} from '@/firebaseApp';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    logout() {
      firebaseApp.auth().signOut().then(() => {
        let toast = this.$toasted.show("Signout Successful", {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        })
      })
      .catch((error) => {
      });
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
    padding-left: 12rem;
    padding-top: 1rem;
    margin-right: 1rem;
    margin-bottom: 1.5rem;
  }
}
</style>
