import Vue from 'vue'
import Router from 'vue-router'
import AdminPage from '@/components/AdminPage'
import Login from '@/components/Login'
import Catalogs from '@/components/catalogs/Catalogs'
import CatalogsForm from '@/components/catalogs/Catalogs-form'
import Products from '@/components/products/Products'
import ProductsForm from '@/components/products/Products-form'
import Employees from '@/components/employee/Employees'
import EmployeesForm from '@/components/employee/Employees-form'
import Categories from '@/components/categories/Categories'
import CategoriesForm from '@/components/categories/Categories-form'
import Prices from '@/components/prices/Prices'
import PricesForm from '@/components/prices/Prices-form'
import Warehouses from '@/components/warehouses/Warehouses'
import WarehousesForm from '@/components/warehouses/Warehouses-form'
import Stocks from '@/components/stocks/Stock'
import StocksForm from '@/components/stocks/Stocks-form'
import Discounts from '@/components/discounts/Discounts'
import DiscountsForm from '@/components/discounts/Discounts-form'
import Logout from '@/components/Logout'
import Welcome from '@/components/Welcome'
import ForgotMyPassword from '@/components/ForgotMyPassword'

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
          path: '/Employees-form',
          name: 'Employees-form',
          component: EmployeesForm
        },
        {
          path: '/Catalogs',
          name: 'Catalogs',
          component: Catalogs
        },
        {
          path: '/Catalogs-form',
          name: 'Catalogs-form',
          component: CatalogsForm
        },
        {
          path: '/Categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: '/Categories-form',
          name: 'Categories-form',
          component: CategoriesForm
        },
        {
          path: '/Products',
          name: 'Products',
          component: Products
        },
        {
          path: '/Products-form',
          name: 'Products-form',
          component: ProductsForm
        },
        {
          path: '/Prices',
          name: 'Prices',
          component: Prices
        },
        {
          path: '/Prices-form',
          name: 'Prices-form',
          component: PricesForm
        },
        {
          path: '/Warehouses',
          name: 'Warehouses',
          component: Warehouses
        },
        {
          path: '/Warehouses-form',
          name: 'Warehouses-form',
          component: WarehousesForm
        },
        {
          path: '/Stocks',
          name: 'Stocks',
          component: Stocks
        },
        {
          path: '/Stocks-form',
          name: 'Stocks-form',
          component: StocksForm
        },
        {
          path: '/Discounts',
          name: 'Discounts',
          component: Discounts
        },
        {
          path: '/Discounts-form',
          name: 'Discounts-form',
          component: DiscountsForm
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
      path: '/Logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/ForgotMyPassword',
      name: 'ForgotMyPassword',
      component: ForgotMyPassword
    }],
  mode: 'history'
})
