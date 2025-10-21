import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from "./shared/components/error/error.component";
import {EmptyLayoutComponent} from "./shared/components/layout/empty-layout/empty-layout.component";
import {MainLayoutComponent} from "./shared/components/layout/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import ('./views/main/main.module').then(m => m.MainModule)},
      { path: 'catalog', loadChildren: () => import ('./views/products/products.module').then(m => m.ProductsModule)},
      { path: 'order', loadChildren: () => import ('./views/order/order.module').then(m => m.OrderModule)},
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '**', component: ErrorComponent }
    ]
  },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
