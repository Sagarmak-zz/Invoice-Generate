<template lang="html">
  <div class="login">
    <div class="main">
      <span class="title">Welcome</span>
      <div class="form">
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Text input">
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
    beforeRouteEnter(to, from, next) {
      // called before the route that renders this component is confirmed.
      // does NOT have access to `this` component instance,
      // because it has not been created yet when this guard is called!
      if (Auth.isAuthenticated()) {
        next({
          name: 'Dashboard'
        })
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
        api.login(this.email, this.password)
          .then((response) => {
            this.load = false;
            Auth.setToken(response.data.token);
            // window.location.href='/home';
            this.$router.push({
              name: 'Dashboard'
            });
          })
          .catch((error) => {
            this.load = false;
            console.log(error);
            if (error == "Error: Network Error") {
              let toast = this.$toasted.error(error, {
                theme: "outline",
                position: "bottom-center",
                duration: 3000
              });
            } else if (error.response.status == 401) {
              let toast = this.$toasted.error(error.response.statusText, {
                theme: "outline",
                position: "bottom-center",
                duration: 3000
              });
            } else {
              console.log(error.response);
              let toast = this.$toasted.error(error.response.statusText, {
                theme: "outline",
                position: "bottom-center",
                duration: 3000,
                icon: 'error'
              });
            }
          });
      }
    },
    components: {
      Loading
    },
  }
</script>

<style lang="scss">
  .login {
    .main {
      width: 500px;
      margin: 0 auto;
      border: solid 1px red;
      margin-top: 10rem;
    }
  }
</style>
