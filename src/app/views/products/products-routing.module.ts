import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeaComponent} from "./tea/tea.component";
import {CatalogComponent} from "./catalog/catalog.component";

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: ':id', component: TeaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
