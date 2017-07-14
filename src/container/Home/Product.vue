<template lang="html">
<div class="add-product">
  <div class="box head-product">
    <h3 class="title">Add Product</h3>
    <button class="button is-primary" @click="showAddProductModal = true">Add</button>
    <AddProductModal @close="showAddProductModal = false" v-if="showAddProductModal"></AddProductModal>
  </div>
  <div class="box reports">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <h4 class="title">Products List</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>HSN Code</th>
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
import AddProductModal from '@/components/AddProductModal';
export default {
  name: 'add-product',
  components: {
    AddProductModal
  },
  data() {
    return {
      showAddProductModal: false
    };
  },
}
</script>

<style lang="scss">
.add-product {
  .head-product {
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
