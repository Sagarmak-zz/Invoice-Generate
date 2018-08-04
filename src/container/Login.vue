<template lang="html">
  <div class="login body">
    <Loading name="BounceLoader" v-if="load"></Loading>
    <div class="login-wrapper columns">
      <div class="column is-8 is-hidden-mobile hero-banner">
        <section class="hero is-fullheight is-dark">
          <div class="hero-body">
            <div class="container section">
              <div class="has-text-right">
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="column is-4">
        <section class="hero is-fullheight">
          <div class="hero-heading">
            <div class="section has-text-centered">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" width="150px">
            </div>
          </div>
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <h1 class="avatar has-text-centered section">
                    <img src="https://placehold.it/128x128">
                  </h1>
                  <div class="login-form">
                    <p class="control has-icon has-icon-right">
                      <input v-model="email" class="input email-input" type="text" placeholder="jsmith@example.org">
                      <span class="icon user">
                        <i class="fa fa-user"></i>
                      </span>
                    </p>
                    <p class="control has-icon has-icon-right">
                      <input @keyup.enter="redirect" v-model="password" class="input password-input" type="password" placeholder="●●●●●●●">
                      <span class="icon user">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p>
                    <p class="control login">
                      <button @click="redirect" class="button is-success is-outlined is-large is-fullwidth">Login</button>
                    </p>
                  </div>
                  <div class="section forgot-password">
                    <p class="has-text-centered">
                      <a href="#">Forgot password</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth.js';
import api from '@/api/main.js';
import Loading from '@/components/Loading.vue';

export default {
  name: 'login',

  beforeRouteEnter( to, from, next ) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    if ( Auth.isAuthenticated() ) {
      next( {
        name: 'Dashboard'
      } )
    } else {
      next();
    }
  },

  data() {
    return {
      email: '',
      password: '',
      load: false
    }
  },
  methods: {
    redirect() {
      this.load = true;
      api.login( this.email, this.password )
        .then( ( response ) => {
          this.load = false;
          Auth.setToken( response.data.token );
          // window.location.href='/home';
          this.$router.push( {
            name: 'Dashboard'
          } );
        } )
        .catch( ( error ) => {
          this.load = false;
          console.log( error );
          if ( error == "Error: Network Error" ) {
            let toast = this.$toasted.error( error, {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
          } else if ( error.response.status == 401 ) {
            let toast = this.$toasted.error( error.response.statusText, {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
          } else {
            console.log( error.response );
            let toast = this.$toasted.error( error.response.statusText, {
              theme: "outline",
              position: "bottom-center",
              duration: 3000,
              icon: 'error'
            } );
          }

        } );
    }
  },

  components: {
    Loading
  },

}
</script>

<style lang="stylus">
.login {
    .email-input,
    .password-input {
        border-radius: 40px;
        font-size: 20px;
        padding-left: 15px;
        color: #95A5A6;
    }

    .icon.password,
    .icon.user {
        margin: 5px 10px 0 0;
    }

    .avatar img {
        border-radius: 100px;
        padding: 5px;
        border: 1px solid #dbdbdb;
    }

    .forgot-password a {
        color: #95A5A6;
        font-weight: bold;
        padding-right: 20px;
    }

    .login {
        padding-top: 20px;
    }

    .login button {
        border-radius: 40px;
        font-weight: bold;
    }

    .hero-body .container {
        margin-top: -100px;
    }

    .hero.is-dark .section {
        background-color: transparent;
    }

    .login-wrapper {
        margin: -0.75rem;
        overflow-y: hidden;
    }

    .hero-banner .hero {
        background: url("https://unsplash.it/2000/1000");
        background-position: center;
        background-size: cover;
        background-blend-mode: normal;
    }
    .hero-banner {
        padding-right: 0;
    }
    .hero-banner .title {
        display: inline-block;
        background-color: rgba(0,0,0, 0.6);
        padding: 5px;
    }

    .column.is-4 {
        padding-left: 0;
        padding-right: 0;
    }

    .control.has-icon:first-child {
        padding-bottom: 0.5rem;
    }
}
</style>
