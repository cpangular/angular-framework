import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRegionHostDirective } from './ui-region-host.directive';
import { UIRegionDirective } from './ui-region.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UIRegionHostDirective,
    UIRegionDirective
   ],
  exports: [
    UIRegionHostDirective,
    UIRegionDirective
  ]
})
export class UIRegionsModule { }
