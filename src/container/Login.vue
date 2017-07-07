<template lang="html">
  <div class="login">
    <section class="hero is-fullheight is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-4 is-offset-4">
              <div class="box">
                <img class="image is-256x256" alt="SW">
                <hr class=image-text>
                <h3 class="title">Siddhartha Wear</h3>
                <hr class="text-body">
                <label class="label">Email</label>
                <p class="control">
                  <input name="email" v-validate="'required|email'" class="input" type="text" placeholder="abc@example.ac.in">
                </p>
                <div class="notification is-danger" v-show="errors.has('email')">
                  <span>{{ errors.first('email') }}</span>
                </div>

                <label class="label">Password</label>
                <p class="control">
                  <input v-validate="'required'" name="password"
                  class="input" type="password" placeholder="●●●●●●●">
                </p>
                <div class="notification is-danger" v-show="errors.has('password')">
                  <span>{{ errors.first('password') }}</span>
                </div>
                <hr>
                <p class="control">
                  <button @click="redirect" class="button is-primary">Login</button>
                  <a class="button npm ruforgot is-pulled-right" @click="forgotModal = true">
                    <small class="forgot">
                      Forgot Password
                    </small>
                  </a>
                </p>
                <!-- <forgot-password v-if="forgotModal" @close="forgotModal = false"></forgot-password> -->
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    redirect() {
      //use replace for not going back
      this.$router.replace({ name: 'Dashboard' });
      // let toast = this.$toasted.success("Student Registration Successful", {
      //   theme: "outline",
      //   position: "top-center",
      //   duration : 3000
      // });
    }
  }
}
</script>

<style lang="scss">
.login {


    .image {
      padding-left: 2.4rem;
    }

    .hero.is-dark .title {
      color: #000000;
    }

    hr.image-text {
      margin-bottom: 0.5rem;
    }

    h3.title {
      margin-bottom: 0;
      color: black;
      padding-left: 2rem;
    }

    hr.text-body {
      margin-top: 0.5rem;
    }

    .notification.is-danger {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: rgba(260,0,0,0.4);
      filter: alpha(opacity=80);
    }

    .control {
      .forgot {
        color: #000000;
      }
    }


}
</style>
