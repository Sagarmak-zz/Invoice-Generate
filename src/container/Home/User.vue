<template lang="html">
<div class="add-user">
  <div class="box head-user">
    <h3 class="title">Add User</h3>
    <button class="button is-primary" @click="showAddUserModal = true">Add</button>
    <AddUserModal @close="showAddUserModal = false" v-if="showAddUserModal"></AddUserModal>
  </div>
  <div class="box reports">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <h4 class="title">Users List</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Person Name</th>
                  <th>Address</th>
                  <th>GST</th>
                  <th>Mobile No-Landline No</th>
                  <th>Email</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Raj Enterprise</td>
                  <td> Vikram Sharma </td>
                  <td> 16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                  </td>
                  <td> AAAA0000A1Z5 </td>
                  <td> 9898766604 - 07922168689 </td>
                  <td> sagar1309@live.com </td>
                  <td> <a class="icon is-small"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </a></td>
                </tr>
                <tr>
                  <tr>
                    <td> Raj Enterprise</td>
                    <td> Vikram Sharma </td>
                    <td> 16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                    </td>
                    <td> AAAA0000A1Z5 </td>
                    <td> 9898766604 - 07922168689 </td>
                    <td> sagar1309@live.com </td>
                    <td> <a class="icon is-small"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </a></td>
                  </tr>
                </tr>
                <tr>
                  <tr>
                    <td> Raj Enterprise</td>
                    <td> Vikram Sharma </td>
                    <td> 16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                    </td>
                    <td> AAAA0000A1Z5 </td>
                    <td> 9898766604 - 07922168689 </td>
                    <td> sagar1309@live.com </td>
                    <td> <a class="icon is-small"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </a></td>
                  </tr>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AddUserModal from '@/components/AddUserModal';
export default {
  name: 'add-user',
  components: {
    AddUserModal
  },
  data() {
    return {
      showAddUserModal: false
    };
  },
}
</script>

<style lang="scss">
.add-user {
  .head-user {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    .title {
      margin: 0;
    }
  }
  .reports {
    // important
    overflow-x:scroll;
    table-layout: inherit;
  }
}
</style>
