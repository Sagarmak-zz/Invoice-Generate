<template lang="html">
  <div class="sidebar">
    <aside class="menu app-sidebar animated">

    <ul class="menu-list">
      <List name="Dashboard" icon="fab fa-slack-hash" route="Dashboard"></List>
      <!-- <List name="Generate Bill" icon="fa fa-file-text" route="Bill"></List> -->
      <List name="Generate Bill" icon="fas fa-file-alt" route="DummyBill"></List>
      <List name="User" icon="far fa-user-circle" route="User"></List>
      <List name="Product" icon="fa fa-plus" route="Product"></List>
      <List name="History" icon="fa fa-history" route="History"></List>
      <List name="Reports" icon="fas fa-chart-line" route="Reports"></List>
      <List name="Settings" icon="fa fa-cogs" route="Settings"></List>
    </ul>
  </aside>
</div>
</template>

<script>
import List from '@/components/List';
export default {
  name: 'sidebar',
  components: {
    List
  },
}
</script>

<style lang="scss">
.sidebar {
    .app-sidebar {
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        padding: 15px 0 50px;
        width: 180px;
        min-width: 45px;
        max-height: 100vh;
        height: calc(100% - 50px);
        z-index: 1024 - 1;
        background: #FFF;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
        overflow-y: auto;
        overflow-x: hidden;
        // margin-top: 0.2rem;
    }

    .icon {
        vertical-align: baseline;
    }

    .menu-label {
        padding-left: 5px;
    }
    li a + ul {
        // margin: 0 10px 0 15px;
    }

    @media print {
        .nodisplay {
            display: none;
        }

    }

}
</style>
