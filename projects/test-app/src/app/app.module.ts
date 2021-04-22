
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRegionsModule } from 'web-cdk';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIRegionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
