import { Routes } from '@angular/router';
import { Home } from './modules/shop/pages/home/home';
import { ProductDetail } from './modules/shop/pages/product-detail/product-detail';
import { Auth } from './modules/auth/components/auth/auth';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
  path: 'product/:slug',
  component: ProductDetail,
},{
  path: 'auth',
  component: Auth
},
  {
    path: '**',
    redirectTo: '',
  },
];