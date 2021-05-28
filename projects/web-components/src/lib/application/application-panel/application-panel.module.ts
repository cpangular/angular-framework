import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiOutletModule } from '@cpangular/web-cdk';
import { TrayModule } from './../../tray/tray.module';
import { ApplicationPanelComponent } from './application-panel.component';

@NgModule({
  imports: [CommonModule, UiOutletModule, TrayModule],
  declarations: [ApplicationPanelComponent],
  exports: [ApplicationPanelComponent],
})
export class ApplicationPanelModule {}
