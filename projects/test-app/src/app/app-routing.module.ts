import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestModalComponent } from './sections/test/test-modal/test-modal.component';

const routes: Routes = [
  {
    path: 'test',
    outlet: 'modal',
    component: TestModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
