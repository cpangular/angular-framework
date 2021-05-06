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

    ]
  },
];

export const WebCdkRoutes = RouterModule.forChild(routes);
