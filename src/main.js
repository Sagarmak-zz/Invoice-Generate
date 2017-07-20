import Vue from 'vue';
import App from './App';
import router from './router';
import 'bulma/css/bulma.css';
import VeeValidate from 'vee-validate'
import Toasted from 'vue-toasted';
import n2w from 'number-to-words';
import Autocomplete from 'vue-bulma-typeahead'
import Auth from '@/packages/auth/Auth.js'

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Toasted);
Vue.use(n2w);
Vue.use(Autocomplete);
Vue.use(Auth);
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
