import { BreakpointsPipe } from './breakpoints.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BreakpointsPipe
  ],
  exports: [BreakpointsPipe]

})
export class BreakpointsModule { }
