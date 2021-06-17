import { Observable } from 'rxjs';
import { distinctUntilChanged, share } from 'rxjs/operators';
import { BreakpointCheckFn } from './BreakpointEvaluator';
import { BreakpointExpression } from './BreakpointExpression';
import { BreakpointConditionResolver } from './internal/BreakpointConditionResolver';
import { convertExpressions } from './internal/convertExpression';

export class BreakpointResolver<T> extends Observable<T> {
  private conditionResolver: BreakpointConditionResolver<T>;

  constructor(
    conditions: BreakpointExpression[],
    dict: Record<string, BreakpointCheckFn> = {},
    element: Element = document.documentElement
  ) {
    super((obs) => {
      const sub = this.conditionResolver.subscribe((val) => {
        obs.next(val);
      });
      return () => {
        sub.unsubscribe();
      };
    });
    this.conditionResolver = new BreakpointConditionResolver<T>(
      convertExpressions(conditions, dict),
      element
    ).pipe(share(), distinctUntilChanged());
  }
}
