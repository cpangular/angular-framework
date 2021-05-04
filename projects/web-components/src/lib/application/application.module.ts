import { ApplicationShellModule } from './application-shell';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ApplicationShellModule
  ],
  exports: [
    ApplicationShellModule
  ],

})
export class ApplicationModule { }
