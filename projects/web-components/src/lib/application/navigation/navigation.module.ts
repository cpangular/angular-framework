import { NavigationStateHandlerDirective } from './navigation-state-handler.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavigationStateHandlerDirective],
  exports: [NavigationStateHandlerDirective]
})
export class NavigationModule { }
