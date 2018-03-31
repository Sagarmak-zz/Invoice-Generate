<template>
  <footer class="footbar">
    <div class="box">
      <div class="content has-text-centered">
        Thanx to <i class="fab fa-vuejs"></i> and <i class="fab fa-laravel"></i>,
        <i class="fa fa-code"> </i> with <i class="fa fa-coffee"> </i> over the time by
        <a href="https://github.com/Sagarmak">Sagar</a> and <a href="https://github.com/JiteshLakhwani">JiteshLakhwani</a>.
      </div>
    </div>
  </footer>
</template>

<script>

  export default {
    name: 'footbar',
  };
</script>

<style lang="scss">
  .footbar {
    margin-top: 1rem;
    .box {
      padding: 0;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 1rem;
      margin: 0;
    }
    .fa-coffee, .fa-paw {
      color: brown;
    }
    .fa-code {
      color: blue;
    }
    .fa-vuejs {
      color: green;
    }
    .fa-laravel {
      color: red;
    }
  }
</style>
