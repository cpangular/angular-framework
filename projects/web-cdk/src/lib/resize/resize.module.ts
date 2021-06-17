import { ResizeDirective } from './resize.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeDirective],
  exports: [ResizeDirective],
})
export class ResizeModule {}
