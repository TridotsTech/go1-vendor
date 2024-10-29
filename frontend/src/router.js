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
    path: '/Dashboard',
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
      path: '/RequestQuotation',
      name:'RequestQuotation',
      component:() => import ('@/pages/RequestQuotation.vue')
    },
    {
      path: '/Request-Quotation-Details/:id',
      name:'Request Quotation Details',
      component:() => import ('@/pages/RequestQuotationDetails.vue'),
      props:{
        id:"123"
      },
    },
    {
      name: 'Supplier',
      path: '/Supplier',
      component: () => import('@/pages/SupplierQuotation.vue'),
    },
    {
      name: 'Supplier Detail',
      path: '/Supplier-Detail/:id',
      component: () => import('@/pages/Supplier Detail.vue'),
    },
    {
      path: '/Purchase',
      name:'Purchase',
      component:() => import ('@/pages/Purchase.vue')
    },
    {
      path: '/Purchase-Detail/:id',
      name:'Purchase Detail',
      component:() => import ('@/pages/Purchase Detail.vue')
    },
    {
      name: 'PurchaseInvoice',
      path: '/SupplierInvoice',
      component: () => import('@/pages/PurchaseInvoice.vue'),
    },
    {
      name: 'Supplier Invoice Details',
      path: '/Supplier-Invoice-Details/:id',
      component: () => import('@/pages/Purchase Invoice Details.vue'),
    },
    {
      path: '/IssuesList',
      name:'IssuesList',
      component:() => import ('@/pages/IssuesList.vue')
    },
    {
      path: '/Issues',
      name:'Issues',
      component:() => import ('@/pages/Issues.vue')
    },
    {
      path: '/Issues-Detail/:id',
      name:'Issues Detail',
      component:() => import ('@/pages/Issues Detail.vue')
    },
    {
      path: '/Addresses',
      name:'Addresses',
      component:() => import ('@/pages/Addresses.vue')
    },
    {
      path: '/Addresses-Detail/:id',
      name:'Addresses Detail',
      component:() => import ('@/pages/Addresses Detail.vue')
    },
    {
      path: '/New-Addresses',
      name:'New Addresses',
      component:() => import ('@/pages/New Addresses.vue')
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

