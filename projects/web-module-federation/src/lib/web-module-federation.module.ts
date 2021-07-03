import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationModule } from '@cpangular/web-components';
import { ApplicationLoaderComponent } from './application-loader/application-loader.component';
import { AppRoutingModule } from './web-module-federation-routing.module';

@NgModule({
  declarations: [ApplicationLoaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApplicationModule,
  ],
  providers: [],
  bootstrap: [ApplicationLoaderComponent],
})
export class WebModuleFederationModule {}
