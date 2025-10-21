import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ErrorComponent} from "./components/error/error.component";
import {EmptyLayoutComponent} from "./components/layout/empty-layout/empty-layout.component";
import {MainLayoutComponent} from "./components/layout/main-layout/main-layout.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ShortTextPipe} from "./pipes/short-text.pipe";
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    EmptyLayoutComponent,
    MainLayoutComponent,
    LoaderComponent,
    ShortTextPipe
  ],
  exports: [
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    EmptyLayoutComponent,
    MainLayoutComponent,
    LoaderComponent,
    ShortTextPipe
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLinkActive,
    FormsModule,
    RouterOutlet
  ]
})
export class SharedModule {
}
