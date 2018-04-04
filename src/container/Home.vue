<template lang="html">
  <div class="home">

    <div class="navbar nodisplay">
      <Navbar @logout="logout" :firm_name="firm_name"></Navbar>
    </div>

    <Sidebar class="nodisplay"></Sidebar>

    <div class="app-main">
      <router-view :admin_state="admin_state" class="inside-app-main"></router-view>
      <FootBar class="nodisplay"></FootBar>
    </div>

  </div>
</template>

<script>
  import Auth from '@/packages/auth/Auth.js';
  import api from '@/api/main';
  import Navbar from '@/components/Navbar';
  import FootBar from '@/components/FootBar';
  import Sidebar from '@/components/Sidebar';
  export default {
    name: 'home',
    data() {
      return {
        username: '',
        admin_state: null,
        firm_name: ''
      };
    },
    mounted() {
      this.callUser();
    },
    methods: {
      callUser() {
        api.userDetails()
          .then((response) => {
            // assign data to data
            this.data = response.data;
            this.admin_state = this.data.state_code;
            this.username = response.data.username;
            this.firm_name = this.data.firm_name;
            // prints the welcome + username
            let toast = this.$toasted.success('Welcome, ' + this.username + '!', {
              theme: "outline",
              position: "top-center",
              duration: 3000,
              icon: 'star'
            });
          })
          .catch((error) => {
            console.log('error');
            console.log(error.response.status);
            console.log(error.response.statusText);
            if (error.response.status == 500) {
              let toast = this.$toasted.error("Please Logout and come back again to continue!", {
                theme: "outline",
                position: "top-center",
                duration: 3000,
                icon: 'sync'
              });
            }
          })
      },
      logout() {
        Auth.destroyToken();
        let toast = this.$toasted.show("Successfully Logged Out!", {
          theme: "outline",
          position: "top-center",
          duration: 3000,
          icon: 'sync'
        });
        this.$router.push({
          name: 'Login'
        });
      }
    },
    components: {
      Navbar,
      Sidebar,
      FootBar
    },
  }
</script>

<style lang="scss">
  .home {
    background-color: whitesmoke;
    .app-main {
      padding-left: 12rem;
      padding-top: 1rem;
      margin-right: 1rem; // margin-bottom: 1.5rem;
      .inside-app-main {
        min-height: 84vh;
      }
    }
    @media print {
      .nodisplay {
        display: none;
      }
      .home {
        display: none;
      }
      .app-main {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
