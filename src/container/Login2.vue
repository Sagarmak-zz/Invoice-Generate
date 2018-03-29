<template lang="html">
  <div class="login2">

    <div class="box">
      <div class="heading">
        <h3 class="title">Siddhartha Wear</h3>
        <h3 class="title">Martiz</h3>
      </div>

      <div class="login-form">
        <div class="field">
          <p class="control">
            <input class="input" name="email" type="text">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" name="email" type="text">
          </p>
        </div>
      </div>
      <div class="login-buttons">
        <a class="button is-medium is-fullwidth">
          <span>Login</span>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth.js';
import api from '@/api/main.js';
import Loading from '@/components/Loading.vue';
export default {
  name: 'login2',


}
</script>

<style lang="scss">
.login2 {
  width: 450px;
  margin: 0 auto;
  margin-top: 3rem;
  .box {
    padding: 0;
    .heading {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .login-form {
      padding: 1rem;
    }
    .login-buttons {
      padding: 1rem;
      padding-top: 0;
      display: flex;
    }
  }
}
</style>
