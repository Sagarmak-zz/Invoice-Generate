import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/packages/auth/Auth.js';
Vue.use(Router);

let router = new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/container/Login'),
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      component: require('@/container/Home'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: require('@/container/Home/Dashboard'),
          meta: { requiresAuth: true }
        },
        {
          path: '/bill',
          name: 'Bill',
          component: require('@/container/Home/Bill'),
          meta: { requiresAuth: true }
        },
        {
          path: '/user',
          name: 'User',
          component: require('@/container/Home/User'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product',
          name: 'Product',
          component: require('@/container/Home/Product'),
          meta: { requiresAuth: true }
        },
        {
          path: '/history',
          name: 'History',
          component: require('@/container/Home/History'),
          meta: { requiresAuth: true },
        },
        {
          path: '/template/:id',
          name: 'BillTemplate',
          component: require('@/container/Home/Billtemplate'),
          meta: { requiresAuth: true }
        },
        {
          path: '/reports',
          name: 'Reports',
          component: require('@/container/Home/Reports'),
          meta: { requiresAuth: true }
        },
        {
          path: '/settings',
          name: 'Settings',
          component: require('@/container/Home/Settings'),
          meta: { requiresAuth: true }
        },
        {
          path: '/dummyBill',
          name: 'DummyBill',
          component: require('@/container/Home/DummyBill'),
          meta: { requiresAuth: true }
        },
      ]
    }, //Home ends*
    {
      path: '/sample',
      name: 'Sample',
      component: require('@/container/Sample'),
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isAuthenticated())
    {
      next({
        name: 'Login'
      });
    }
    else {
      next() // make sure to always call next()!
    }
  }
  else {
    next() // make sure to always call next()!
  }
})

export default router;
