import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CrazyButtonsLibModule} from 'crazy-buttons-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CrazyButtonsLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
