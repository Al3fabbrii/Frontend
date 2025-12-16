import { Routes } from '@angular/router';
import { CheckoutPage } from './features/checkout/checkout-page/checkout-page';
import { ProductDetailPage } from './features/products/product-detail-page/product-detail-page';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login-page/login-page').then(m => m.LoginPage)
    },
    {
        path: 'products',
        loadComponent: () => import('./features/products/product-page/product-page').then(m => m.ProductPage),
    },
    { path: 'product/:id', component: ProductDetailPage },
    { path: 'checkout', component: CheckoutPage, canActivate: [authGuard] },
];
