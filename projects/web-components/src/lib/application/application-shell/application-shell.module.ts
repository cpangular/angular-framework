import { NavigationModule } from './../navigation/navigation.module';

import { RouterModule } from '@angular/router';
import { UiOutletModule } from '@cpangular/web-cdk';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicationLayoutModule } from '../../application-layout/application-layout.module';
import { ApplicationShellComponent } from './application-shell.component';

@NgModule({
  imports: [
    CommonModule,
    UiOutletModule,
    ApplicationLayoutModule,
    NavigationModule,
    RouterModule,
  ],
  declarations: [ApplicationShellComponent],
  exports: [ApplicationShellComponent],
})
export class ApplicationShellModule {}
