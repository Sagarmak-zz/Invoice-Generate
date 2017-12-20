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
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Admin Name</label>
              <p class="control">
                <input v-model="admin_name = data.username" class="input" name="admin_name" v-validate="'required'" type="text" placeholder="Admin Name">
              </p>
              <div v-show="errors.has('admin_name')" class="help is-danger">
                The Admin Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Firm Name</label>
              <p class="control">
                <input v-model="firm_name = data.firm_name" class="input" name="firm_name" v-validate="'required'" type="text" placeholder="Firm Name">
              </p>
              <div v-show="errors.has('firm_name')" class="help is-danger">
                The Firm Name is required.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">GST Number</label>
              <p class="control">
                <input v-model="gst_no = data.gst_number" class="input" name="gst_no" v-validate="'required'" type="text" placeholder="GST Number">
              </p>
              <div v-show="errors.has('gst_no')" class="help is-danger">
                The GST Number is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Email</label>
              <p class="control">
                <input v-model="email = data.email" name="email" v-validate="'required|email'" type="email" placeholder="Email" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('email')">
                The Email is required and should be a valid Email address.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Address</label>
              <p class="control">
                <textarea v-model="address = data.address" name="address" v-validate="'required'" class="textarea" placeholder="Address"></textarea>
              </p>
              <div v-show="errors.has('address')" class="help is-danger">
                The Address is a required field..
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field mobile">
              <label class="label">Contact No(Mobile)</label>
              <p class="control">
                <input v-model="mobile = data.mobile_number" name="mobile" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('mobile')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
            <div class="field">
              <label class="label">Contact No(Landline)</label>
              <p class="control">
                <input v-model="landline = data.landline_number" name="landline" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('landline')">
                The Contact Number field is required and should contain at least 8 numeric values.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">City</label>
              <p class="control">
                <input v-model="city = data.cityname" class="input" name="city" v-validate="'required'" type="text" placeholder="City">
              </p>
              <div v-show="errors.has('city')" class="help is-danger">
                The City Name is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">State</label>
              <p class="control">
                <StateDropdown :stateCode="data.state_code"></StateDropdown>
              </p>
              <div v-show="errors.has('state')" class="help is-danger">
                The State is required.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Pincode</label>
              <p class="control">
                <input v-model="pincode = data.pincode" name="pincode" v-validate="'required|numeric'" type="text" placeholder="Pincode" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('pincode')">
                The Pincode is required and should be a numeric code.
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Bank Name</label>
              <p class="control">
                <input v-model="bank_name = data.bank_name" class="input" name="bank_name" type="text" placeholder="Bank Name">
              </p>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">IFSC Code</label>
              <p class="control">
                <input v-model="ifsc_code = data.ifsc_code" class="input" name="ifsc_code" type="text" placeholder="IFSC Code">
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Account Number</label>
              <p class="control">
                <input v-model="account_no = data.account_no" class="input" name="account_no" type="text" placeholder="Account Number">
              </p>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Branch Name</label>
              <p class="control">
                <input v-model="branch_name = data.branch_name" class="input" name="branch_name" type="text" placeholder="Branch Name">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-show="loading">
        <span class="title is-4">Please wait while we load the data...</span>
        <div class="fa fa-spinner fa-spin"> </div>
      </div>
      <div class="update-button" v-if="!loading">
        <button @keyup.enter="validateAndUpdateDetails"
        @click="validateAndUpdateDetails" class="button is-success">Update</button>
        <button @click="addUser = true" class="button is-pulled-right">Add User</button>
        <AddAdminUserModal v-if="addUser" @close="addUser = false"></AddAdminUserModal>
      </div>

  </div>

  <div class="state" v-if="!loading">
    <div class="box">
      <div class="state-head title">
        Manage States
      </div>
      <div class="state-body">
        <div class="items" v-for="state in states">
          <span class="code">{{state.state_code}}</span>
          <span class="name">{{state.state_name}}</span>
          <div class="icons">
            <a @click="deleteState(state.state_code)" class="icon is-small"> <i class="fas fa-trash-alt"></i> </a>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="field is-grouped">
          <p class="control code">
            <input v-model="code" v-validate="'required|numeric'" name="code" :class="{'input': true, 'is-danger': errors.has('code') }" type="text" placeholder="Code">
          </p>
          <p class="control">
            <input v-model="name" @keyup.enter="validateAndAddState()" v-validate="'required'" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
          </p>
          <p class="control">
            <a @click="validateAndAddState()" class="button is-success">
              Add State
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import api from '@/api/main';
import Auth from '@/packages/auth/Auth';
import jwt_decode from 'jwt-decode';
import StateDropdown from '@/components/StateDropdown';
import AdminDetailsUpdateModal from '@/components/AdminDetailsUpdateModal';
import AddAdminUserModal from '@/components/AddAdminUserModal';
import EditStateBox from '@/components/EditStateBox';
import LoadingLight from '@/components/LoadingLight';
export default {
  name: 'settings',
  data() {
    return {
      data: {},
      userId: null,
      admin_name: '',
      firm_name: '',
      gst_no: '',
      email: '',
      address: '',
      city: '',
      state_code: null,
      pincode: '',
      mobile: null,
      landline: null,
      states: [],
      bank_name: '',
      ifsc_code: '',
      account_no: null,
      branch_name: '',
      code: '',
      name: '',
      newStateId: null,
      showAdminDetailsModal: false,
      udapteStateModal: false,
      addUser: false,
      loading: false,
      loadingLight: false
    };
  },
  created() {
    this.decodeToken();
    this.$bus.$on( 'state-change', ( response ) => {
      this.state_code = response.state_id;
    } )
    this.$bus.$on( 'close-admin-update-modal', () => {
      this.showAdminDetailsModal = false;
      this.callStates();
      this.callUser();
    } );
    this.$bus.$on( 'add-admin-close', () => {
      this.addUser = false;
    } );
    this.callStates();
    this.callUser();
  },
  methods: {
    decodeToken() {
      var decoded = jwt_decode( Auth.getToken() );
      this.userId = decoded.sub;
    },
    callUser() {
      this.loading = true;
      api.userDetails()
        .then( ( response ) => {
          this.loading = false;
          // assign data to data
          this.data = response.data;
          this.state_code = response.data.state_code;
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
    callStates() {
      api.getState()
        .then( ( response ) => {
          this.states = response.data.states;
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
    //validate state
    validateAndAddState() {
      this.validate()
      if ( !this.errors.any() ) {
        if ( this.dataIsHere == false ) {
          let toast = this.$toasted.error( 'Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        } else {
          this.submitState();
        }
      } else {
        let toast = this.$toasted.error( 'Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    },
    //states
    submitState() {
      this.loadingLight = true;
      api.addState( this.code, this.name )
        .then( ( response ) => {
          this.loadingLight = false;
          if ( response.status == 200 ) {
            this.callStates();
            let toast = this.$toasted.success( "State Added Successfully!", {
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
    deleteState( code ) {
      api.deleteState( code )
        .then( ( response ) => {
          if ( response.status == 200 ) {
            this.callStates();
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
    validateAndUpdateDetails() {
      this.$validator.validateAll( {
        'admin_name': this.admin_name,
        'firm_name': this.firm_name,
        'gst_no': this.gst_no,
        'email': this.email,
        'address': this.address,
        'city': this.city,
        'pincode': this.pincode,
        'mobile': this.mobile,
        'landline': this.landline
      } )
      if ( !this.errors.any() ) {
        if ( this.dataIsHere == false ) {
          let toast = this.$toasted.error( 'Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        } else {
          //work or call an api
          this.updateDetails();
        }
      } else {
        let toast = this.$toasted.error( 'Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    },
    updateDetails() {
      this.loadingLight = true;
      console.log('Api called');
      api.updateUserDetails( this.userId, this.admin_name, this.email, this.firm_name, this.gst_no,
          this.address, this.city, this.state_code, this.pincode, this.mobile, this.landline, 
          this.bank_name, this.branch_name, this.ifsc_code, this.account_no )
        .then( ( response ) => {
          console.log(response);
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
    validate() {
      return this.$validator.validateAll();
    },
  },
  components: {
    StateDropdown,
    AdminDetailsUpdateModal,
    EditStateBox,
    AddAdminUserModal,
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
    .form {
        padding: 1rem;
    }
    .update-button {
        padding: 1rem;
        border-top: solid 1px #ddd;
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
