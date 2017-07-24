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
import api from '@/api/main';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'home',
  data() {
    return {
      data: { },
      username: ''
    };
  },
  created() {
    this.callUser();
  },
  methods: {
    callUser() {
      api.userDetails()
      .then((response) => {
        // assign data to data
        this.data = response.data;
        this.username = response.data.username;
        // prints the welcome + username
        let toast = this.$toasted.success('Welcome, ' + this.username + '!', {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response.status);
        console.log(error.response.statusText);
        if(error.response.status == 500) {
          let toast = this.$toasted.error("Please Logout and come back again to continue!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
        }
      })
    },
    logout() {
      Auth.destroyToken();
      let toast = this.$toasted.show("Successfully Logged Out!", {
        theme: "outline",
        position: "top-center",
        duration : 3000
      });
      this.$router.push({name: 'Login'});
    }
  },
  components: {
    Navbar,
    Sidebar
  },
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
