import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponentsComponent } from './web-components.component';
import { WebComponentsRoutes } from './web-components.routing';

@NgModule({
  imports: [
    CommonModule,
    WebComponentsRoutes
  ],
  declarations: [WebComponentsComponent]
})
export class WebComponentsModule { }
