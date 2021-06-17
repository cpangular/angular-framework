import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'web-cdk',
    loadChildren: () =>
      import('./web-cdk/web-cdk.module').then((m) => m.WebCdkModule),
  },
  {
    path: 'web-components',
    loadChildren: () =>
      import('./web-components/web-components.module').then(
        (m) => m.WebComponentsModule
      ),
  },
];

export const LibsRoutes = RouterModule.forChild(routes);
