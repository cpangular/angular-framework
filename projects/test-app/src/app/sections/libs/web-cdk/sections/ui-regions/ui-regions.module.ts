import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { UIRegionsModule } from '@cpangular/web-cdk';
import { BasicExampleComponent } from './pages/BasicExample/BasicExample.component';
import { UiRegionsComponent } from './ui-regions.component';
import { UiRegionsRoutes } from './ui-regions.routing';
@NgModule({
  imports: [
    CommonModule,
    UiRegionsRoutes,
    MatListModule,
    UIRegionsModule,
    MatRadioModule
  ],
  declarations: [
    UiRegionsComponent,
    BasicExampleComponent
  ]
})
export class UiRegionsModule { }
