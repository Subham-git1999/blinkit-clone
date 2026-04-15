import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then((m) => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.page').then((m) => m.CheckoutPage)
  },
  {
    path: 'checkout/success',
    loadComponent: () =>
      import('./pages/checkout-success/checkout-success.page').then((m) => m.CheckoutSuccessPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
