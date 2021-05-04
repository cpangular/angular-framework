import { BreakpointsModule } from 'web-cdk';
import { ApplicationShellModule } from 'web-components';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRegionsModule } from 'web-cdk';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionsModule } from './sections/sections.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SectionsModule,
    UIRegionsModule,
    ApplicationShellModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    BreakpointsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
