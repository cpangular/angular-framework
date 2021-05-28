import { BComponent } from './sections/b/b.component';
import { AComponent } from './sections/a/a.component';
import { RouterModule, Routes } from '@angular/router';
import { WebCdkComponent } from './web-cdk.component';

const routes: Routes = [
  {
    path: '',
    component: WebCdkComponent,
    children: [
      {
        path: '',
        redirectTo: 'a',
      },
      {
        path: 'a',
        component: AComponent,
      },
      {
        path: 'b',
        component: BComponent,
      },
    ],
  },
];

export const WebCdkRoutes = RouterModule.forChild(routes);
