import Vue from 'vue';
import App from './App';
import router from './router';
import 'bulma/css/bulma.css';
import VeeValidate from 'vee-validate'
import Toasted from 'vue-toasted';
import Autocomplete from 'vue-bulma-typeahead';
import Auth from '@/packages/auth/Auth.js';
import moment from 'moment';

const flatpickr = require("flatpickr");
Vue.prototype.flatpickr = flatpickr;
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Toasted);
Vue.use(Autocomplete);
Vue.use(Auth);
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
