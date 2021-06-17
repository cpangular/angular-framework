import { Pipe, PipeTransform } from '@angular/core';
import { BreakpointExpression } from '@cpangular/web-utils';
import { BreakpointService } from './breakpoint.service';

@Pipe({
  name: 'breakpoints',
})
export class BreakpointsPipe implements PipeTransform {
  constructor(private bs: BreakpointService) {}

  transform<T = any>(value: BreakpointExpression<T>[], args?: any): any {
    return this.bs.createResolver(value, {});
  }
}
