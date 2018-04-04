<template lang="html">
  <div class="grid-list-dropdown">

    <span class="select is-fullwidth">
      <select name="type" v-model="getYear"
      @change="$emit('update:type', $event.target.value)">
      <option v-for="type in types" :value="type">{{type}}</option>
    </select>
  </span>

  </div>
</template>

<script>
export default {
  name: 'grid-list-dropdown',
  props: ['type'],
  creted() {
  },
  data() {
    return {
      types: ['Grid', 'List']
    };
  },
  methods: {

  },
  computed: {
    getYear() {
      return this.type;
    }
  }
}
</script>

<style lang="scss">
.fiscal-year-dropdown {

}
</style>
