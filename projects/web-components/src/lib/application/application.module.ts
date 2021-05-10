import { NgModule } from '@angular/core';
import { ApplicationShellModule } from './application-shell';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [
    ApplicationShellModule,
    NavigationModule
  ],
  exports: [
    ApplicationShellModule,
    NavigationModule
  ],

})
export class ApplicationModule { }
