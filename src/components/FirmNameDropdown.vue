<template lang="html">
  <div class="firm-name-dropdown">
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="firm" @change="stateChange()" name="customer">
        <option value=null>Select dropdown</option>
        <option v-for="firm in firms" :value="firm">{{firm.firm_name}}</option>
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
  name: 'firm-name-dropdown',
  created() {
    this.listCustomer();
  },
  data() {
    return {
      firm: '',
      firm_id: null,
      firms: [],
      show: true,
      code: null,
      state_code: null
    };
  },
  methods: {
    listCustomer() {
      api.listCustomer()
      .then((response) => {
        this.firms = response.data.firms;
      })
      .catch((error) => {
        console.log(error);
      })
    },

    stateChange() {
      this.$bus.$emit('firm_name_change', {
        firm: this.firm
      });
    },
  }
}
</script>

<style lang="scss">
.firm-name-dropdown {
  .select.is-fullwidth {
    width: 26rem;
  }
}
</style>
