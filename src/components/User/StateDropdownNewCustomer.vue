<template lang="html">
  <div>

    <span class="select is-fullwidth">

      <select v-validate="'required|not_in:null'" v-model="getStateCode"
      @change="$emit('update:stateCode', $event.target.value)" name="state">
        <option value=null>Select dropdown</option>
        <option v-for="state in states" :value="state.state_code">{{state.state_code}} - {{state.state_name}}</option>
      </select>

    </span>

    <div class="help is-danger" v-show="errors.has('state')">
      {{errors.first('state')}}
    </div>

  </div>
</template>

<script>
import api from '@/api/main';

export default {
  inject: ['$validator'],
  name: 'state-dropdown',
  props: ['stateCode'],
  created() {
    this.getStates();
  },
  data() {
    return {
      states: [],
      show: true,
      state_code: null
    };
  },
  computed: {
    getStateCode() {
      return this.stateCode;
    }
  },
  methods: {
    getStates() {
      api.getState()
      .then((response) => {
        this.states = response.data.states;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
}
</script>

<style lang="scss">
.state-dropdown {
  z-index: 1026;
}
</style>
