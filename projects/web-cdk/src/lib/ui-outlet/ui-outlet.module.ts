import { UseUiOutletDirective } from './use-ui-outlet.directive';
import { UiOutletDirective } from './ui-outlet.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UiOutletDirective, UseUiOutletDirective],
  exports: [UiOutletDirective, UseUiOutletDirective]
})
export class UiOutletModule { }
