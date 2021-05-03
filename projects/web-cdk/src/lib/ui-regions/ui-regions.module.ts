import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRegionDirective } from './ui-region.directive';
import { UIRegionAttachmentDirective } from './ui-region-attachment.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UIRegionDirective,
    UIRegionAttachmentDirective
   ],
  exports: [
    UIRegionDirective,
    UIRegionAttachmentDirective
  ]
})
export class UIRegionsModule { }
