<template lang="html">
  <div class="navbar">
    <section class="hero is-bold app-navbar animated">
      <div class="hero-head">
        <nav class="nav">
          <div class="nav-left">
            <a class="nav-item is-hidden-tablet">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </a>
          </div>
          <div class="nav-center">
            <a class="nav-item hero-brand" href="/">
              <img src="">
              <div class="is-mobile">
                <span class="vue">Siddhartha</span><strong class="admin">Wear</strong>
              </div>
            </a>
          </div>
          <div class="nav-right is-flex">
            <!-- <a class="nav-item">Logout</a> -->
            <a @click="changePassword = true" class="nav-item">
              User
              <span class="icon is-small"> <i class="fa fa-caret-down" aria-hidden="true"></i> </span> </a>
              <ChangePasswordModal v-if="changePassword" @close="changePassword = false"></ChangePasswordModal>
              <!-- <router-link class="nav-item" to="">
              <span class="icon is-small"> <i class="fa fa-cog" aria-hidden="true"></i> </span>
              Settings
            </router-link> -->
            <a @click="$emit('logout')" class="nav-item">
              <span class="icon is-small"> <i class="fa fa-sign-out" aria-hidden="true"></i> </span>
              Logout
            </a>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import ChangePasswordModal from '@/components/ChangePasswordModal';
export default {
  name: 'navbar',
  components: {
    ChangePasswordModal
  },
  data() {
    return {
      changePassword: false
    }
  },
  created() {
    this.$bus.$on('password-changed', () => {
      this.changePassword = false;
    })
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
}
</style>
