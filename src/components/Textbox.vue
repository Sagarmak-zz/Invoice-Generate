<template lang="html">
  <div class="textbox">
    <label class="label">{{label}}</label>
    <p class="control is-mobile">
      <input v-model="retValue" :class="{'input': true, 'is-danger': errors.has('name') }" name="name"
      v-validate=validate type="text" placeholder="Customer Name Dropdown">
    </p>
    <div v-show="errors.has('name')" class="help is-danger">
      {{errors.first('name')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'textbox',
  props: ['label', 'name', 'validate'],
  created() {
  },
  data() {
    return {
      retValue: ''
    }
  },
  methods: {
    sendValue() {
      this.$bus.$emit(this.label, {name: this.retValue});
    }
  }
}
</script>

<style lang="scss">
.textbox {
  width: 45%;
  .input {
  }
}
</style>
