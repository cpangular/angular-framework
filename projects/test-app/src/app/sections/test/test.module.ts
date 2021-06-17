import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestModalComponent } from './test-modal/test-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TestModalComponent],
  exports: [TestModalComponent],
})
export class TestModule {}
