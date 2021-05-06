import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointsModule, ResizeModule, UiOutletModule } from '@cpangular/web-cdk';
import { TrayModule } from '../tray/tray.module';
import { ApplicationHeaderModule } from './../application/application-header/application-header.module';
import { ApplicationPanelModule } from './../application/application-panel/application-panel.module';
import { ApplicationLayoutComponent } from './application-layout.component';


@NgModule({
  imports: [
    CommonModule,
    ResizeModule,
    ScrollingModule,
    TrayModule,
    RouterModule,
    BreakpointsModule,
    ApplicationPanelModule,
    ApplicationHeaderModule,
    UiOutletModule
  ],
  declarations: [ApplicationLayoutComponent],
  exports: [ApplicationLayoutComponent]
})
export class ApplicationLayoutModule { }
