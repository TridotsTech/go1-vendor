import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Dashboard' },
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
 
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/pages/main.vue'),
    props:true,
    meta: { requiresAuth: true },
  },
  {
  path: '/account/register',
  name:'Register',
  component:() => import ('@/pages/Register.vue')
  },
 
    {
      path: '/request-for-quotation',
      name:'RequestForQuotation',
      component:() => import ('@/pages/RequestForQuotation.vue')
    },
    {
      path: '/request-for-quotation/:id',
      name:'Request Quotation Details',
      component:() => import ('@/pages/RequestQuotationDetails.vue'),
      props:{
        id:"123"
      },
    },
    {
      name: 'Supplier',
      path: '/supplier-quotation',
      component: () => import('@/pages/SupplierQuotation.vue'),
    },
    {
      name: 'Supplier Detail',
      path: '/supplier-quotation/:id',
      component: () => import('@/pages/Supplier Detail.vue'),
    },
    {
      path: '/purchase-order',
      name:'Purchase',
      component:() => import ('@/pages/Purchase.vue')
    },
    {
      path: '/purchase-order/:id',
      name:'Purchase Detail',
      component:() => import ('@/pages/Purchase Detail.vue')
    },
    {
      name: 'PurchaseInvoice',
      path: '/supplier-invoice',
      component: () => import('@/pages/PurchaseInvoice.vue'),
    },
    {
      name: 'Supplier Invoice Details',
      path: '/supplier-invoice/:id',
      component: () => import('@/pages/Purchase Invoice Details.vue'),
    },
    {
      path: '/issues',
      name:'IssuesList',
      component:() => import ('@/pages/IssuesList.vue')
    },
    {
      path: '/issues',
      name:'Issues',
      component:() => import ('@/pages/Issues.vue')
    },
    {
      path: '/issues/:id',
      name:'Issues Detail',
      component:() => import ('@/pages/Issues Detail.vue')
    },
    {
      path: '/addresses',
      name:'Addresses',
      component:() => import ('@/pages/Addresses.vue')
    },
    {
      path: '/addresses/:id',
      name:'Addresses Detail',
      component:() => import ('@/pages/Addresses Detail.vue')
    },
    {
      path: '/new-Addresses',
      name:'New Addresses',
      component:() => import ('@/pages/New Addresses.vue')
    },
    {
      path: '/test',
      name:'test',
      component:() => import ('@/pages/test.vue')
    },
    {
      path: '/Signup',
      name:'Signup',
      component:() => import ('@/pages/Signup.vue')
    },
]

let router = createRouter({
  history: createWebHistory('/go1_vendor'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn;
  try {
    await userResource.promise;
  } catch (error) {
    isLoggedIn = false; 
  }


  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' }); 
  } else if (to.name === 'Register' && isLoggedIn) {
    next({ name: 'Home' }); 
  } else if (to.name !== 'Login' && to.name !== 'Register' && !isLoggedIn) {
    next({ name: 'Login' }); 
  } else {
    next(); 
  }
});

export default router

