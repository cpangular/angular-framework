
import { Pipe, PipeTransform } from '@angular/core';
import { BreakpointService } from './breakpoint.service';
import { BreakpointExpression } from 'web-utils';
import { AsyncPipe } from '@angular/common';

@Pipe({
  name: 'breakpoints'
})
export class BreakpointsPipe implements PipeTransform {

  constructor(
    private bs: BreakpointService
  ) {

  }

  transform<T = any>(value: BreakpointExpression<T>[], args?: any): any {
    return this.bs.createResolver(value, {});
  }

}
