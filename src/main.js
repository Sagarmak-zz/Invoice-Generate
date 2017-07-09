import Vue from 'vue';
import App from './App';
import router from './router';
import 'bulma/css/bulma.css';
import VeeValidate from 'vee-validate'
import Toasted from 'vue-toasted';
import Buefy from 'buefy';
import n2w from 'number-to-words';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);
Vue.config.productionTip = false;
Vue.use(VeeValidate)
Vue.use(Toasted)
Vue.use(n2w);

Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
