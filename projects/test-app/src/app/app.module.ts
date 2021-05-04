import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointsModule, UIRegionsModule } from '@cpangular/web-cdk';
import { ApplicationShellModule } from '@cpangular/web-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionsModule } from './sections/sections.module';



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
