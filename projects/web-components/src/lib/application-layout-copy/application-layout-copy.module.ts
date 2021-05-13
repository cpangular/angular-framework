import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointsModule, ResizeModule, UiOutletModule } from '@cpangular/web-cdk';
import { TrayModule } from '../tray/tray.module';
import { ApplicationHeaderModule } from '../application/application-header/application-header.module';
import { ApplicationPanelModule } from '../application/application-panel/application-panel.module';
import { NavigationModule } from '../application/navigation/navigation.module';
import { ApplicationLayoutCopyComponent } from './application-layout-copy.component';


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
    UiOutletModule,
    NavigationModule
  ],
  declarations: [ApplicationLayoutCopyComponent],
  exports: [ApplicationLayoutCopyComponent]
})
export class ApplicationLayoutCopyModule { }
