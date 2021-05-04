import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UIRegionsModule } from '@cpangular/web-cdk';
import { WebCdkComponent } from './web-cdk.component';
import { WebCdkRoutes } from './web-cdk.routing';

@NgModule({
  imports: [
    CommonModule,
    UIRegionsModule,
    WebCdkRoutes,
    MatListModule,
    MatButtonModule
  ],
  declarations: [WebCdkComponent],
  providers: [

  ]
})
export class WebCdkModule { }
