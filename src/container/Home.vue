<template lang="html">
  <div class="home">

    <!-- <div class="navbar nodisplay">
      <Navbar @logout="logout" :firm_name="firm_name"></Navbar>
    </div> -->

    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <Sidebar :items="sidebar_items" class="nodisplay"></Sidebar>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{ 'Siddhartha Wear' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Sagar</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fill-height class="grey lighten-4">
        <router-view :admin_state="admin_state" class="inside-app-main"></router-view>
      </v-container>
    </v-content>

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
        firm_name: '',
        drawer: null,
        sidebar_items: [
        { icon: 'fas fa-tachometer-alt', text: 'Dashboard', route: 'Dashboard' },
        { icon: 'fas fa-file-alt', text: 'Generate Bill', route: 'Bill' },
        { icon: 'fa fa-clipboard', text: 'Generate Chalan', route: 'Chalan' },
        { icon: 'fas fa-user-plus', text: 'Users', route: 'User' },
        { icon: 'fab fa-product-hunt', text: 'Product', route: 'Product' },
        { icon: 'fas fa-history', text: 'History', route: 'History' },
        { icon: 'fas fa-chart-line', text: 'Reports', route: 'Reports' },
        { icon: 'fas fa-cogs', text: 'Settings', route: 'Settings' },
      ]
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
            console.log(error);
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

  #keep main .container {
    height: 660px;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
