<template lang="html">
  <div>
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="state_id = code" @change="stateChange()" name="state">
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
  name: 'state-dropdown',
  created() {
    this.callStates();
    this.code = this.stateCode;
  },
  props: ['stateCode'],
  data() {
    return {
      state_id: null,
      states: [],
      show: true,
      code: null
    };
  },
  methods: {
    stateChange() {
      this.$bus.$emit('state-change', { state_id: this.state_id });
    },
    callStates() {
      api.getState()
      .then((response) => {
        this.states = response.data.states;
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss">
.state-dropdown {
  z-index: 1026;
}
</style>
