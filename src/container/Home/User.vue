<template lang="html">
<div class="add-user">
  <div class="box heading">
    <h3 class="title">Add User</h3>
    <button class="button is-primary">Add</button>
  </div>
  <div class="box reports">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <h4 class="title">Table Responsive</h4>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Raj Enterprise
                  </td>
                  <td>
                    Vikram Sharma
                  </td>
                  <td>
                    16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                  </td>
                  <td>
                    22AAAAA0000A1Z5
                  </td>
                  <td>
                    9898766604 - 07922168689
                  </td>
                  <td>
                    sagar1309@live.com
                  </td>
                </tr>
                <tr>
                  <td>
                    Raj Enterprise
                  </td>
                  <td>
                    Vikram Sharma
                  </td>
                  <td>
                    16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                  </td>
                  <td>
                    22AAAAA0000A1Z5
                  </td>
                  <td>
                    9898766604 - 07922168689
                  </td>
                  <td>
                    sagar1309@live.com
                  </td>
                </tr>
                <tr>
                  <td>
                    Raj Enterprise
                  </td>
                  <td>
                    Vikram Sharma
                  </td>
                  <td>
                    16, Usha Kiran Appartments, Near Krishna Baug Cross Roads, Maninagar, Ahmedabad, Gujarat
                  </td>
                  <td>
                    22AAAAA0000A1Z5
                  </td>
                  <td>
                    9898766604 - 07922168689
                  </td>
                  <td>
                    sagar1309@live.com
                  </td>
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
export default {
  name: 'add-user'
}
</script>

<style lang="scss">
.add-user {
  .heading {
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
