import { TrayModule } from './../../tray/tray.module';
import { UIRegionsModule } from '@cpangular/web-cdk';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPanelComponent } from './application-panel.component';

@NgModule({
  imports: [
    CommonModule,
    UIRegionsModule,
    TrayModule
  ],
  declarations: [ApplicationPanelComponent],
  exports: [ApplicationPanelComponent]
})
export class ApplicationPanelModule { }
