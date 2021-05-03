import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
