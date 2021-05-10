
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavigationModule } from '@cpangular/web-components';
import { WebCdkComponent } from './web-cdk.component';
import { WebCdkRoutes } from './web-cdk.routing';


@NgModule({
  imports: [
    CommonModule,
    WebCdkRoutes,
    MatListModule,
    MatButtonModule,
    NavigationModule
  ],
  declarations: [WebCdkComponent],
  providers: [

  ]
})
export class WebCdkModule { }
