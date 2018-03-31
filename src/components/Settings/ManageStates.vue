<template lang="html">
  <div class="manage-states">
    <div class="box">
      <div class="state-head title">
        Manage States
      </div>
      <div class="state-body">
        <div class="items" v-for="state in getStatesList">
          <span class="code">{{state.state_code}}</span>
          <span class="name">{{state.state_name}}</span>
          <div class="icons">
            <a @click="deleteState(state.state_code)" class="icon is-small"> <i class="fas fa-trash-alt"></i> </a>
          </div>
        </div>
      </div>
      <div class="foot">

        <form @submit.prevent="addState">

          <div class="field is-grouped">
            <p class="control code">
              <input v-model="state.code" v-validate="'required|numeric'" name="code"
              :class="{'input': true, 'is-danger': errors.has('code') }" type="text" placeholder="Code">
            </p>
            <p class="control">
              <input v-model="state.name" v-validate="'required'" name="name"
              :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
            </p>
            <p class="control">
              <button type="submit" class="button is-success">
                Add State
              </button>
            </p>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manage-states',
  props: ['states'],
  created() {
    this.statesList = this.states;
  },
  computed: {
    getStatesList() {
      return this.states
    }
  },
  data() {
    return {
      statesList: [],
      state: {
        code: null,
        name: ''
      }
    }
  },
  methods: {
    validate() {
      return this.$validator.validateAll();
    },
    deleteState(state_code) {
      this.$bus.$emit('delete-state', { state_code: state_code });
    },
    addState() {
      this.validate()
      if (!this.errors.any()) {
        this.$bus.$emit('add-state', { state: this.state });
      }
      else {
        let toast = this.$toasted.error('Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        });
      }
    },
    validateState() {
      if ( !this.errors.any() ) {
        this.addState();
      } else {
        let toast = this.$toasted.error( 'Please fill in the details.', {
          theme: "outline",
          position: "bottom-center",
          duration: 3000
        } );
      }
    }
  }
}
</script>

<style lang="scss">
.manage-states {
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
</style>
