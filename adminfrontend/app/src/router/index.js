import Vue from 'vue'
import Router from 'vue-router'
import AdminPage from '@/components/AdminPage'
import Login from '@/components/Login'
import Test from '@/components/test'
import Catalogs from '@/components/Catalogs'
import Products from '@/components/Products'
import Employees from '@/components/Employees'
import Categories from '@/components/Categories'
import Prices from '@/components/Prices'
import Warehouses from '@/components/Warehouses'
import Discounts from '@/components/Discounts'
import Logout from '@/components/Logout'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AdminPage',
      name: 'AdminPage',
      component: AdminPage,
      children: [
        {
          path: '/Employees',
          name: 'Employees',
          component: Employees
        },
        {
          path: '/Catalogs',
          name: 'Catalogs',
          component: Catalogs
        },
        {
          path: '/Categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: '/Products',
          name: 'Products',
          component: Products
        },
        {
          path: '/Prices',
          name: 'Prices',
          component: Prices
        },
        {
          path: '/Warehouses',
          name: 'Warehouses',
          component: Warehouses
        },
        {
          path: '/Discounts',
          name: 'Discounts',
          component: Discounts
        },
        {
          path: '/Welcome',
          name: 'Welcome',
          component: Welcome
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout
    }],
  mode: 'history'
})
