import { UiOutletModule } from '@cpangular/web-cdk';
import { NgModule } from '@angular/core';
import { ApplicationShellModule } from './application-shell';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [ApplicationShellModule, UiOutletModule, NavigationModule],
  exports: [ApplicationShellModule, UiOutletModule, NavigationModule],
})
export class ApplicationModule {}
