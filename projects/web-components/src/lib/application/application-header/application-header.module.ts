import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRegionsModule, UiOutletModule } from '@cpangular/web-cdk';
import { TrayModule } from './../../tray/tray.module';
import { ApplicationHeaderComponent } from './application-header.component';

@NgModule({
  imports: [
    CommonModule,
    TrayModule,
    UiOutletModule
  ],
  declarations: [ApplicationHeaderComponent],
  exports: [ApplicationHeaderComponent]
})
export class ApplicationHeaderModule { }
