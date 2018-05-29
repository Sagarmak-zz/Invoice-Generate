<template>
  <div class="login">

    <Loading name="BounceLoader" v-if="load"></Loading>

    <div class="container">

      <div class="box inside-box">
        <div class="title-head">
          <span class="title is-1">Siddhartha Wear</span>
        </div>

        <div class="login-form">

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="email" name="email" type="email" data-vv-delay="1000"
              :class="{'input': true, 'is-danger': errors.has('email') }"
              placeholder="Email input" v-validate="'required|email'">
            </div>
            <span v-show="errors.has('email')" class="help is-danger">
              {{ errors.first('email') }}
            </span>
          </div>


          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password" name="password" type="password" data-vv-delay="1000"
              :class="{'input': true, 'is-danger': errors.has('password') }"
              placeholder="********" v-validate="'required'" @keyup.enter="redirect">
            </div>
            <span v-show="errors.has('password')" class="help is-danger">
              {{ errors.first('password') }}
            </span>
          </div>

        </div>

        <div class="field login-footer">

          <div class="control">
            <button class="button is-primary" @click="redirect">
              Login
            </button>
          </div>
        </div>

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

<style lang="scss">
.login {
  background: linear-gradient(#e66465, #9198e5);
  .container {
    padding: 1em;
    min-height:100vh;
  }
  .box {
    padding: 0;
  }
  .inside-box {
    width: 500px;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 3px;
    height: auto;
    box-shadow: 3px 3px 25px #000;
  }
  .title-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    padding-right: 1rem;
    border-bottom: solid 1px black;
    span.title {
      padding-left: 1rem;
      margin-bottom: 0;
    }
  }
  .login-form {
    padding: 1rem;
  }
  .signup-form {
    padding: 1rem;
  }
  .login-footer {
    padding: 1rem;
    border-top: solid 1px black;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media all and (max-width: 500px) {
    .box {
      max-width: 350px;
      .title-head {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
a {
  color: #42b983;
}
</style>