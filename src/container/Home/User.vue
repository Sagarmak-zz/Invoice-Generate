<template lang="html">
  <div class="add-user">
    <div class="box">

      <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>

      <div class="head-user">
        <h3 class="title">Users</h3>
        <button class="button is-primary is-pulled-right" v-if="!showAddUser" @click="showAddUser = true">Add</button>
        <button class="button" v-if="showAddUser" @click="showAddUser = false">Hide</button>
      </div>

      <AddUser v-if="showAddUser"></AddUser>

      <div class="reports" v-if="!isData">
        <div class="tile is-ancestor" v-if="!loadingData">
          <div class="tile is-parent">
            <article class="tile is-child">
              <div class="user-head">
                <h4 class="title">Customers List</h4>
                <span>Total Customers: <b>{{users.length}}</b></span>
              </div>
              <div class="table-responsive">
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>Firm Name</th>
                      <th>Contact Person Name</th>
                      <th>GST</th>
                      <th>Email</th>
                      <th>Mobile No-Landline No</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users">
                      <td>{{user.name}}</td>
                      <td>{{user.person_name}}</td>
                      <td>{{user.gst_number}}</td>
                      <td>{{user.email}}</td>
                      <td> {{user.billing_mobile_number}} - {{user.billing_landline_number}} </td>
                      <td>
                        <a class="icon">
                          <EditUserModal :key="user.id" :userEdit="user"></EditUserModal>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
        <div class="loadingData" v-show="loadingData">
          <span class="title is-4">Please wait while we load the data...</span>
          <div class="fa fa-spinner fa-spin"> </div>
        </div>
      </div>
      <div class="isData" v-if="isData">
        <h1 class="title">No Data at the Moment.</h1>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/main';
import AddUser from '@/components/User/AddUser';
import EditUserModal from '@/components/User/EditUserModal';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'add-user',
  created() {
    this.$bus.$on('add-user', (data) => {
      this.user = data.user;
      this.addUser();
    });
    this.$bus.$on('updateUser', () => {
      this.getCustomer();
    })
    this.getCustomer();
  },
  data() {
    return {
      user: {
        firm_name: '',
        contact_person_name: '',
        gst_no: '',
        email: '',
        billing: {
          address: '',
          city: '',
          state_code: null,
          pincode: '',
          mobile: null,
          landline: null,
        },
        shipping: {
          address: '',
          city: '',
          state_code: null,
          pincode: '',
          mobile: null,
          landline: null,
        },
      },
      showAddUser: false,
      users: [],
      isData: false,
      loadingData: false,
      loadingLight: false
    };
  },
  methods: {
    getCustomer() {
      this.loadingData = true;
      api.getCustomer()
      .then((response) => {
        this.loadingData = false;
        if(response.data.message == "No data found") {
          this.isData = true;
        }
        else {
          this.users = response.data.Firms;
          this.isData = false;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    addUser() {
      this.loadingLight = true;
      api.createCustomer(this.user.firm_name, this.user.contact_person_name, this.user.email, this.user.gst_no,
        this.user.billing.address, this.user.billing.city, this.user.billing.state_code, this.user.billing.pincode, this.user.billing.mobile, this.user.billing.landline,
        this.user.shipping.address, this.user.shipping.city, this.user.shipping.state_code, this.user.shipping.pincode, this.user.shipping.mobile, this.user.shipping.landline)
        .then((response) => {
          console.log(response);
          this.loadingLight = false;
          if(response.status == 200) {
            this.getCustomer();
            let toast = this.$toasted.success("Customer Added Successfully!", {
              theme: "outline",
              position: "top-center",
              duration : 3000
            });
            this.showAddUser = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadingLight = false;
          console.log(error);
          let toast = this.$toasted.error(error.response.data.message, {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        })
      },
      validate() {
        return this.$validator.validateAll();
      },
    },
    components: {
      AddUser,
      EditUserModal,
      LoadingLight
    },
  }
  </script>

  <style lang="scss">
  .add-user {
    .head-user {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px #ddd;
      .title {
        margin: 0;
      }
    }
    .reports {
      // important
      // border-top: solid 1px #ddd;
      padding: 1rem;
      overflow-x:scroll;
      table-layout: inherit;
    }

    .column.gst {
      padding-top: 0;
      .input {
        width: 29.6rem;
      }
    }
    .column.email {
      padding-top: 0;
    }
    .title.billing {
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding-left: 1.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0;
      background: whitesmoke;
    }
    .shipping {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding-left: 1.5rem;
      padding-right: 1.6rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      background: whitesmoke;
      .title {
        margin: 0;
      }
    }

    .tile.is-parent {
      padding-bottom: 0;
    }

    .columns {
      margin: 0;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .modal-head {
      padding-bottom: 1rem;
      border-bottom: solid 1px #ddd;
    }
    .modal-card {
      width: 1000px;
    }
    .modal-card-foot {
      display: flex;
      justify-content: space-between;
    }

    .box {
      padding: 0;
    }

    .button-form {
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      padding: 1rem;
      padding-left: 1.7rem;
    }

    .user-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .title {
        margin: 0;
      }
    }

    .isData {
      padding: 1rem;
    }

    .loadingData {
      margin-top: 0.3rem;
      margin-left: 0.3rem;
    }

  }
  </style>
