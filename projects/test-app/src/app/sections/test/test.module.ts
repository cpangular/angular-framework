import { TestModalComponent } from './test-modal/test-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestModalComponent],
  exports: [TestModalComponent],
})
export class TestModule { }
