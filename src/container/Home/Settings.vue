<template lang="html">
  <div class="settings">
    <div class="box">
      <LoadingLight name="BounceLoader" v-if="loadingLight"></LoadingLight>
      <div class="head-settings">
        <h3 class="title">Edit your Settings</h3>
        <button @click="showAdminDetailsModal = true" class="button is-primary">Edit</button>
        <AdminDetailsUpdateModal v-if="showAdminDetailsModal" @close="showAdminDetailsModal = false" :data="data"></AdminDetailsUpdateModal>
      </div>

      <div class="form" v-if="!loading">

        <AdminForm :data="data"></AdminForm>

      </div>
      <div class="loading" v-show="loading">
        <span class="title is-4">Please wait while we load the data...</span>
        <div class="fa fa-spinner fa-spin"> </div>
      </div>

    </div>

    <ManageStates :states="states"></ManageStates>

  </div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import jwt_decode from 'jwt-decode';
import AdminForm from '@/components/Settings/AdminForm';
import ManageStates from '@/components/Settings/ManageStates';
import StateDropdown from '@/components/StateDropdown';
import AdminDetailsUpdateModal from '@/components/AdminDetailsUpdateModal';

import EditStateBox from '@/components/EditStateBox';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'settings',
  data() {
    return {
      admin: {
        admin_name: '',
        firm_name: '',
        gst_no: '',
        email: '',
        address: {
          address: '',
          city: '',
          state_code: null,
          pincode: null,
        },
        contact: {
          mobile: null,
          landline: null,
        },
        bank: {
          bank_name: '',
          ifsc_code: '',
          account_no: null,
          branch_name: '',
        }
      },
      states: [],
      data: {},
      adminId: null,
      state: {
        code: '',
        name: '',
      },
      newStateId: null,
      showAdminDetailsModal: false,
      udapteStateModal: false,
      loading: false,
      loadingLight: false
    };
  },
  created() {
    this.getStates();
    this.getUser();
    this.decodeToken();
    this.$bus.$on( 'add-admin-close', () => {
      this.addUser = false;
    } );
    this.$bus.$on('admin-form', (data) => {
      this.admin = data.admin;
      this.updateAdmin();
    });
    this.$bus.$on('add-state', (data) => {
      this.addState(data.state);
    });
    this.$bus.$on('delete-state', (data) => {
      this.deleteState(data.state_code);
    });
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode( Auth.getToken() );
      this.adminId = decoded.sub;
    },
    getUser() {
      this.loading = true;
      api.userDetails()
      .then( ( response ) => {
        this.loading = false;
        // assign data to data
        this.data = response.data;
      } )
      .catch( ( error ) => {
        console.log( error.response.status );
        console.log( error.response.statusText );
        if ( error.response.status == 500 ) {
          let toast = this.$toasted.error( "Please Logout and come back again to continue!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
        }
      } )
    },
    getStates() {
      api.getState()
      .then( ( response ) => {
        this.states = response.data.states;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    },
    //states
    addState(state) {
      this.loadingLight = true;
      api.addState(state.code, state.name)
      .then( ( response ) => {
        this.loadingLight = false;
        if ( response.status == 200 ) {
          this.getStates();
          let toast = this.$toasted.success( "State Added Successfully!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
        }
      } )
      .catch((error) => {
        this.loadingLight = false;
        console.log("Error: ", error);
        console.log(error.response.data.message);
        let toast = this.$toasted.error( error.response.data.message, {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      } )
    },
    deleteState(code) {
      api.deleteState(code)
      .then( ( response ) => {
        if ( response.status == 200 ) {
          this.getStates();
          let toast = this.$toasted.success( "State Deleted Successfully!", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
        }
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    },
    updateAdmin() {
      this.loadingLight = true;
      api.updateUserDetails( this.adminId, this.admin.admin_name, this.admin.email, this.admin.firm_name, this.admin.gst_no,
        this.admin.address.address, this.admin.address.city, this.admin.address.state_code, this.admin.address.pincode,
        this.admin.contact.mobile, this.admin.contact.landline, this.admin.bank.bank_name, this.admin.bank.branch_name,
        this.admin.bank.ifsc_code, this.admin.bank.account_no )
        .then( ( response ) => {
          this.loadingLight = false;
          if ( response.data.message == "Failed to update record" ) {
            let toast = this.$toasted.error( 'Failed to update record.', {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
            this.$bus.$emit( 'close-admin-update-modal' );
          } else {
            let toast = this.$toasted.success( 'Update Successfull.', {
              theme: "outline",
              position: "top-center",
              duration: 3000
            } );
          }
        } )
        .catch( ( error ) => {
          this.loadingLight = false;
          console.log( error.response.data.message );
          let toast = this.$toasted.error( error.response.data.message, {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        } )
      },
    },
    components: {
      AdminForm,
      ManageStates,
      StateDropdown,
      AdminDetailsUpdateModal,
      EditStateBox,
      LoadingLight
    }
  }
  </script>
  <style lang="scss">
  .settings {
    .box {
      padding: 0;
    }
    .head-settings {
      padding: 1rem;
      border-bottom: solid 1px #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        margin: 0;
      }
    }

    .content {
      padding: 1rem;
    }

    .state {
      .state-head {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
        margin: 0;
      }
      .state-body {
        padding: 1rem;
      }
      .items {
        max-width: 200px;
        width: 100%;
        padding-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .foot {
        border-top: solid 1px #ddd;
        padding: 1rem;
        .control.code {
          width: 6%;
        }
      }
    }

    .icons {
      display: flex;
      align-items: center;
    }

    .field.is-grouped {
      border-bottom: 0;
      margin: 0;
      padding: 0;
    }

    .loading {
      padding: 1rem;
    }

  }
  </style>
