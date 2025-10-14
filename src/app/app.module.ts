import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/main/main.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { TeaComponent } from './components/pages/tea/tea.component';
import { OrderComponent } from './components/pages/order/order.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ErrorComponent } from './components/common/error/error.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MainLayoutComponent } from './components/common/layout/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './components/common/layout/empty-layout/empty-layout.component';
import {LightboxModule} from "ngx-lightbox";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoaderComponent } from './components/common/loader/loader.component';
import { ShortTextPipe } from './pipes/short-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    TeaComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    LoaderComponent,
    ShortTextPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LightboxModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
