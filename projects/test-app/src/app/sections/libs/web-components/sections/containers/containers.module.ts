import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrayModule } from '@cpangular/web-components';
import { ContainersRoutingModule } from './containers-routing.module';
import { ContainersComponent } from './containers.component';
import { TrayComponent } from './sections/tray/tray.component';

@NgModule({
  imports: [CommonModule, ContainersRoutingModule, TrayModule],
  declarations: [ContainersComponent, TrayComponent],
})
export class ContainersModule {}
