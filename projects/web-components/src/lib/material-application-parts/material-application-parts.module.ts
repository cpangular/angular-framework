import { MatToolbarModule } from '@angular/material/toolbar';
import { UiOutletModule, ImageModule } from '@cpangular/web-cdk';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialApplicationPartsComponent } from './material-application-parts.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule, UiOutletModule, ImageModule],
  declarations: [MaterialApplicationPartsComponent],
})
export class MaterialApplicationPartsModule {}
