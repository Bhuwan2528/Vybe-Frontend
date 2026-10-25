import { Routes } from '@angular/router';

import { Home } from './modules/shop/pages/home/home';
import { ProductDetail } from './modules/shop/pages/product-detail/product-detail';
import { Auth } from './modules/auth/components/auth/auth';
import { StoreComponent } from './modules/shop/pages/store/store';
import { OutfitMatchResultComponent } from './modules/shop/pages/outfit-match-result/outfit-match-result';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'product/:slug',
    component: ProductDetail,
  },
  {
    path: 'auth',
    component: Auth,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  {
    path: 'ai-outfit',
    component: OutfitMatchResultComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];