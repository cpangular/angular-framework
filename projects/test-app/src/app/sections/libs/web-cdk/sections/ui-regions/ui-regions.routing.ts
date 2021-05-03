import { Routes, RouterModule } from '@angular/router';
import { BasicExampleComponent } from './pages/BasicExample/BasicExample.component';
import { UiRegionsComponent } from './ui-regions.component';

const routes: Routes = [
  {
    path: '',
    component: UiRegionsComponent,
    children: [
      {
        path: '',
        component: BasicExampleComponent
      }
    ]
  },
];

export const UiRegionsRoutes = RouterModule.forChild(routes);
