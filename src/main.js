import Vue from 'vue';
import App from './App';
import router from './router';
import 'bulma/css/bulma.css';
import VeeValidate from 'vee-validate'
import Toasted from 'vue-toasted';
import Autocomplete from 'vue-bulma-typeahead';
import Auth from '@/packages/auth/Auth.js';
import moment from 'moment';
import swal from 'sweetalert2';


const flatpickr = require("flatpickr");
Vue.prototype.flatpickr = flatpickr;
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Toasted);
Vue.use(Autocomplete);
Vue.use(Auth);
Vue.prototype.$bus = new Vue();
const swalPlugin = {};
swalPlugin.install = function(Vue){
	Vue.prototype.$swal = swal;
}
Vue.use(swalPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
