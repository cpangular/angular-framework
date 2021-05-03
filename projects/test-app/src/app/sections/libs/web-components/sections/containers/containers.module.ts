import { TrayModule } from 'web-components';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers.component';

import { ContainersRoutingModule } from './containers-routing.module';
import { TrayComponent } from './sections/tray/tray.component';

@NgModule({
  imports: [
    CommonModule,
    ContainersRoutingModule,
    TrayModule
  ],
  declarations: [
    ContainersComponent,
    TrayComponent
  ]
})
export class ContainersModule { }
