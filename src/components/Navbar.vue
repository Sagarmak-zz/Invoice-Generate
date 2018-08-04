<template lang="html">
   <div class="navbar nodisplay">
   <!-- <section class="hero is-bold app-navbar animated">
      <div class="hero-head">
        <nav class="nav">
          <div class="nav-left">

          </div>
          <div class="nav-center">
            <a class="nav-item hero-brand" href="/">
              <div class="is-mobile">
                <span class="vue">{{firm_name_first}}</span><strong class="admin">{{firm_name_last}}</strong>
              </div>
            </a>
          </div>
          {{getComputedFirmName}}
          <div class="nav-right is-flex">
            <a @click="changePassword = true" class="nav-item">
              User
              <span class="icon is-small"> <i class="fa fa-caret-down" aria-hidden="true"></i> </span> </a>
              <ChangePasswordModal v-if="changePassword" @close="changePassword = false"></ChangePasswordModal>
              <a @click="$emit('logout')" class="nav-item">
                <span class="icon is-small"> <i class="fas fa-sign-out-alt" aria-hidden="true"></i> </span>
                Logout
              </a>
            </div>
          </nav>
        </div>
      </section> -->

      <v-toolbar fixed app clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          {{ 'Siddhartha Wear2' }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>Sagar12</v-btn>
        </v-toolbar-items>
      </v-toolbar>

    </div>
</template>

  <script>
  import ChangePasswordModal from '@/components/ChangePasswordModal';
  export default {
    name: 'navbar',
    props: ['firm_name'],
    data() {
      return {
        name: '',
        changePassword: false,
        drawer: null
      }
    },
    created() {
      this.$bus.$on( 'password-changed', () => {
        this.changePassword = false;
      } )
    },
    components: {
      ChangePasswordModal
    },
  }
  </script>

  <style lang="scss">
  .navbar {
    .app-navbar {
      position: fixed;
      min-width: 100%;
      z-index: 1024;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
      .nav {
        text-align: auto;
      }
      .container {
        margin: auto 10px;
      }
      .nav-right {
        align-items: stretch;
        align-items: stretch;
        flex: 1;
        justify-content: flex-end;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;
      }
    }
    .hero-brand {
      .vue {
        margin-left: 10px;
        // color: #36AC70;
        color: #4f6359;
      }
      .admin {
        color: #28374B;
      }
    }
    @media print {
      .nodisplay {
        display: none;
      }

    }
  }
  </style>
