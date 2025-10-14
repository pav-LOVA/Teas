import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/pages/main/main.component";
import {CatalogComponent} from "./components/pages/catalog/catalog.component";
import {TeaComponent} from "./components/pages/tea/tea.component";
import {ErrorComponent} from "./components/common/error/error.component";
import {EmptyLayoutComponent} from "./components/common/layout/empty-layout/empty-layout.component";
import {MainLayoutComponent} from "./components/common/layout/main-layout/main-layout.component";
import {OrderComponent} from "./components/pages/order/order.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'catalog/:id', component: TeaComponent },
      { path: 'order', component: OrderComponent },
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
