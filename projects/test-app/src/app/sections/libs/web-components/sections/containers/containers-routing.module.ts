import { TtttResolver } from './tttt.resolver';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { TrayComponent } from './sections/tray/tray.component';

const routes: Routes = [
  {
    path: '',
    component: ContainersComponent,
    children: [
      {
        path: '',
        redirectTo: 'tray',
      },
      {
        path: 'tray',
        component: TrayComponent,
        resolve: {
          test: TtttResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainersRoutingModule {}
