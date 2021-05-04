import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRegionsModule } from '@cpangular/web-cdk';
import { ApplicationLayoutModule } from '../../application-layout/application-layout.module';
import { ApplicationShellComponent } from './application-shell.component';

@NgModule({
  imports: [
    CommonModule,
    UIRegionsModule,
    ApplicationLayoutModule
  ],
  declarations: [
    ApplicationShellComponent
  ],
  exports: [
    ApplicationShellComponent
  ]
})
export class ApplicationShellModule { }
