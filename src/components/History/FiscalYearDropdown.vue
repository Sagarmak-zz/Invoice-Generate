<template lang="html">
  <div class="fiscal-year-dropdown">

    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" name="year" v-model="getYear"
      @change="$emit('update:year', $event.target.value)">
      <option v-for="y in years" :value="y">{{y}}</option>
    </select>
  </span>

  <div class="help is-danger" v-show="errors.has('year')">
    {{errors.first('year')}}
  </div>

  </div>
</template>

<script>
export default {
  name: 'fiscal-year-dropdown',
  props: ['year'],
  creted() {
    console.log(this.year);
  },
  data() {
    return {
      years: ['2017-18', '2018-19']
    };
  },
  methods: {

  },
  computed: {
    getYear() {
      if(!this.year) {
        return this.years[0];
      }
      else {
        return this.year;
      }
    }
  }
}
</script>

<style lang="scss">
.fiscal-year-dropdown {

}
</style>
