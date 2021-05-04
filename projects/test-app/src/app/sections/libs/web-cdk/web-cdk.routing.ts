import { RouterModule, Routes } from '@angular/router';
import { WebCdkComponent } from './web-cdk.component';

const routes: Routes = [
  {
    path: "",
    component: WebCdkComponent,
    children: [
      {
        path: '',
        redirectTo: 'ui-regions'
      },
      {
        path: 'ui-regions',
        loadChildren: () => import('./sections/ui-regions/ui-regions.module').then(m => m.UiRegionsModule)
      }
    ]
  },
];

export const WebCdkRoutes = RouterModule.forChild(routes);
