import { UiOutletModule } from '@cpangular/web-cdk';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicationLayoutModule } from '../../application-layout/application-layout.module';
import { ApplicationShellComponent } from './application-shell.component';

@NgModule({
  imports: [
    CommonModule,
    UiOutletModule,
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
