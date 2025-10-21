import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {SharedModule} from "../../shared/shared.module";
import {SlickCarouselModule} from "ngx-slick-carousel";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    SlickCarouselModule,
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }
