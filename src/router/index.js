import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/container/Login')
    },
    {
      path: '/home',
      component: require('@/container/Home'),
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: require('@/container/Home/Dashboard')
        },
        {
          path: '/bill',
          name: 'Bill',
          component: require('@/container/Home/Bill')
        },
        {
          path: '/user',
          name: 'User',
          component: require('@/container/Home/User')
        },
        {
          path: '/product',
          name: 'Product',
          component: require('@/container/Home/Product')
        },
        {
          path: '/history',
          name: 'History',
          component: require('@/container/Home/History')
        },
        {
          path: '/reports',
          name: 'Reports',
          component: require('@/container/Home/Reports')
        },
      ]
    }, //Home ends*
  ]
})
