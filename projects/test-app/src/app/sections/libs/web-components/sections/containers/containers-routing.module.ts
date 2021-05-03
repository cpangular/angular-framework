
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { TrayComponent } from './sections/tray/tray.component';

const routes: Routes = [
  {
    path: '',
    component: ContainersComponent,
    children: [
      {
        path: '',
        redirectTo: 'tray'
      },
      {
        path: 'tray',
        component: TrayComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainersRoutingModule { }
