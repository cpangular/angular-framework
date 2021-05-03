import { UIRegionsModule } from 'web-cdk';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationShellComponent } from './application-shell.component';
import { ApplicationLayoutModule } from '../application-layout/application-layout.module';

@NgModule({
  imports: [
    CommonModule,
    UIRegionsModule
  ],
  declarations: [
    ApplicationShellComponent
  ],
  exports: [
    ApplicationShellComponent
  ]
})
export class ApplicationShellModule { }
