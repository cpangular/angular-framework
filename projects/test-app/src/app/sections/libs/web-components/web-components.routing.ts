import { RouterModule, Routes } from '@angular/router';
import { WebComponentsComponent } from './web-components.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'containers'
  },
  {
    path: 'containers',
    component: WebComponentsComponent,
    loadChildren: () => import('./sections/containers/containers.module').then(m => m.ContainersModule)
  },
];

export const WebComponentsRoutes = RouterModule.forChild(routes);
