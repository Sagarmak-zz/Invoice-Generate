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
            <a class="nav-item">
            User
            <span class="icon is-small"> <i class="fa fa-caret-down" aria-hidden="true"></i> </span> </a>

            <router-link class="nav-item" to="">
              <span class="icon is-small"> <i class="fa fa-cog" aria-hidden="true"></i> </span>
              Settings
            </router-link>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'navbar',

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
