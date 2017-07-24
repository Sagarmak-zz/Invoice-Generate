<template lang="html">
  <div class="settings">
    <div class="box">
      <div class="head-settings">
        <h3 class="title">Edit your Settings</h3>
        <button @click="showAdminDetailsModal = true" class="button is-primary">Edit</button>
        <AdminDetailsUpdateModal v-if="showAdminDetailsModal" @close="showAdminDetailsModal = false" :data="data"></AdminDetailsUpdateModal>
      </div>
      <div class="content">

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Admin Name</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.username }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Firm Name</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.firm_name }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Admin Email</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.email }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>GST Number</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.gst_number }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Address</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.address }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>City</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.cityname }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>State</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                <span v-if="state.state_code == data.state_code" v-for="state in states">{{state.state_code}} - {{state.state_name}}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Pincode</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.pincode }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Mobile Number</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.mobile_number }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <p>Landline Number</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{ data.landline_number }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="state">
      <div class="box">
        <div class="state-head title">
          Manage States
        </div>
        <div class="state-body">
          <div class="items" v-for="state in states">
            <span class="code">{{state.state_code}}</span>
            <span class="name">{{state.state_name}}</span>
            <div class="icons">
              <a @click="deleteState(state.state_code)" class="icon is-small"> <i class="fa fa-trash-o"></i> </a>
            </div>
          </div>
        </div>
        <div class="foot">
          <div class="field is-grouped">
            <p class="control code">
              <input v-validate="'required|numeric'" v-model="code" name="code" :class="{'input': true, 'is-danger': errors.has('code') }" type="text" placeholder="Code">
            </p>
            <p class="control">
              <input @keyup.enter="validateAndAddState()" v-validate="'required'" v-model="name" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
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
import StateDropdown from '@/components/StateDropdown';
import AdminDetailsUpdateModal from '@/components/AdminDetailsUpdateModal';
import EditStateBox from '@/components/EditStateBox';
export default {
  name: 'settings',
  data() {
    return {
      data: {},
      admin_name: '',
      firm_name: '',
      gst_no: '',
      email: '',
      address: '',
      city: '',
      state_code: '',
      pincode: '',
      mobile: null,
      landline: null,
      states: [],
      code: '',
      name: '',
      newStateId: null,
      showAdminDetailsModal: false,
      udapteStateModal: false
    };
  },
  created() {
    this.$bus.$on('state-change', (data) => {
      this.state_code = data.state_id;
    })
    this.$bus.$on('close-admin-update-modal', () => {
      this.showAdminDetailsModal = false;
      this.callStates();
      this.callUser();
    })
    this.callStates();
    this.callUser();
  },
  methods: {
    callUser() {
      api.userDetails()
      .then((response) => {
        // assign data to data
        this.data = response.data;
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response.status);
        console.log(error.response.statusText);
        if(error.response.status == 500) {
          let toast = this.$toasted.error("Please Logout and come back again to continue!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
        }
      })
    },
    callStates() {
      api.getState()
      .then((response) => {
        this.states = response.data.states;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    //validate state
    validateAndAddState() {
      this.validate()
      if (!this.errors.any()) {
        if(this.dataIsHere == false) {
          let toast = this.$toasted.error('Please fill in the details.', {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else {
          this.submitState();
        }
      }
      else {
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
      }
    },
    //states
    submitState() {
      api.addState(this.code, this.name)
      .then((response) => {
        if(response.status == 200) {
          this.callStates();
          let toast = this.$toasted.success("State Added Successfully!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        let toast = this.$toasted.error(error.response.data.message, {
          theme: "outline",
          position: "bottom-center",
          duration : 3000
        });
      })
    },
    deleteState(code) {
      api.deleteState(code)
      .then((response) => {
        if(response.status == 200) {
          this.callStates();
          let toast = this.$toasted.success("State Deleted Successfully!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    // updateState() {
    //   api.updateState(code, state_name)
    //   .then((response) => {
    //     if(response.status == 200) {
    //       this.callStates();
    //       let toast = this.$toasted.success("State Deleted Successfully!", {
    //         theme: "outline",
    //         position: "top-center",
    //         duration : 3000
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // },
    validate() {
      return this.$validator.validateAll();
    },
  },
  components: {
    StateDropdown,
    AdminDetailsUpdateModal,
    EditStateBox
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
  .button-submit {
    padding: 1rem;
    border-top: solid 1px #ddd;
  }

  .content {
    padding: 1rem;
  }

  .field
  {
    border-bottom: solid 1px #ddd;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    .field-label
    {
      text-align: left;
      font-weight: bold;
    }
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
}
</style>
