import { ApplicationPanelModule } from './../application/application-panel/application-panel.module';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLayoutComponent } from './application-layout.component';
import { ResizeModule, UIRegionsModule, BreakpointsModule } from '@cpangular/web-cdk';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { TrayModule } from '../tray/tray.module';

@NgModule({
  imports: [
    CommonModule,
    ResizeModule,
    UIRegionsModule,
    ScrollingModule,
    TrayModule,
    RouterModule,
    BreakpointsModule,
    ApplicationPanelModule
  ],
  declarations: [ApplicationLayoutComponent],
  exports: [ApplicationLayoutComponent]
})
export class ApplicationLayoutModule { }
