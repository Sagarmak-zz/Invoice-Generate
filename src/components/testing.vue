<template lang="html">
  <div class="testing">
    <div class="practise">
      <label class="label">U.S. State</label>
      <Typehead :source="source" :onSelect="onSelect" :onChange="onChange" :limit="5"></Typehead>
      <!-- send the data in an array, in a source data property -->
      <!-- stores the returned data in value(see in data properties) -->
    </div>
  </div>
</template>

<script>
import Typehead from 'vue-bulma-typeahead';

export default {
  name: 'testing',
  components: {
    Typehead
  },
  data() {
    return {
      source: ['AP', 'UP', 'Gujarat', 'Karnataka', 'JK'],
      value: '',
    }
  }
}
</script>

<style lang="scss">
.testing {

}
</style>
