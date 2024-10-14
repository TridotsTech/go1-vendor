import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  // {
  //   name: 'quotations',
  //   path: '/Quotations',
  //   component: () => import('@/pages/Quotations.vue'),
  // },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Supplier',
    path: '/Supplier',
    component: () => import('@/pages/Supplier.vue'),
  },
  {
    name: 'Supplier Detail',
    path: '/Supplier-Detail/:id',
    component: () => import('@/pages/Supplier Detail.vue'),
  },
  {
    name: 'PurchaseInvoice',
    path: '/PurchaseInvoice',
    component: () => import('@/pages/PurchaseInvoice.vue'),
  },
  {
    name: 'Purchase Invoice Detail',
    path: '/Purchase-Invoice-Detail/:id',
    component: () => import('@/pages/Purchase Invoice Detail.vue'),
  },
    {
      path: '/RequestQuotation',
      name:'RequestQuotation',
      component:() => import ('@/pages/RequestQuotation.vue')
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
      path: '/Request-Quotation-Details/:id',
      name:'Request Quotation Details',
      component:() => import ('@/pages/Request Quotation Details.vue')
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
    // {
    //   path: '/Dashboard',
    //   name:'Dashboard',
    //   component:() => import ('@/pages/Dashboard.vue')
    // }
]

let router = createRouter({
  history: createWebHistory('/go1_vendor'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
