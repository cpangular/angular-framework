import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSvgDirective } from './inline-svg.directive';

@NgModule({
imports: [
  CommonModule
],
   declarations: [
      InlineSvgDirective
   ],
  exports: [
            InlineSvgDirective
  ]
})
export class ImageModule { }

