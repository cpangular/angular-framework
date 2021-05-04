import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibsModule } from './libs/libs.module';
import { TestModule } from './test/test.module';

@NgModule({
  imports: [
    CommonModule,
    LibsModule,
    TestModule
  ]
})
export class SectionsModule { }
