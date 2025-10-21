import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {CatalogComponent} from "./catalog/catalog.component";
import {LightboxModule} from "ngx-lightbox";
import {TeaComponent} from "./tea/tea.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    CatalogComponent,
    TeaComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    LightboxModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
