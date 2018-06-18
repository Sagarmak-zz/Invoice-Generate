<template lang="html">
  <div class="change-invoice-type">

    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" name="invoice_type"
      @change="$emit('update:invoice_type', $event.target.value)">
      <option v-for="type in invoice_types" :value="type">{{type}}</option>
    </select>
  </span>

  <div class="help is-danger" v-show="errors.has('invoice_type')">
    {{errors.first('invoice_type')}}
  </div>
</div>
</template>

<script>
export default {
  name: 'change-invoice-type',
  props: ['invoice_type'],
  created() {
  },
  data() {
    return {
      invoice_types: ['Chalans', 'Bills'],
      invoice_type_name: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.change-invoice-type {

}
</style>
