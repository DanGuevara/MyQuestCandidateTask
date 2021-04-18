import {NgModule} from '@angular/core';
import {CrazyButtonsComponent} from './crazy-buttons/crazy-buttons.component';
import {CrazyButtonComponent} from './crazy-buttons/components/crazy-button/crazy-button.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    CrazyButtonsComponent,
    CrazyButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [
    CrazyButtonsComponent,
    CrazyButtonComponent,
  ]
})
export class CrazyButtonsLibModule {
}
