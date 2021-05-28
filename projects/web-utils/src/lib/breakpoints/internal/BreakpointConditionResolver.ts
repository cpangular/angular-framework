import { Observable } from 'rxjs';
import { ResizeObservable } from '../../observers/resize/resize-observable';
import { BreakpointEvaluator } from '../BreakpointEvaluator';
import { ViewSize } from '../ViewSize';

export class BreakpointConditionResolver<T> extends Observable<T> {
  constructor(
    conditions: BreakpointEvaluator[],
    element: Element = document.documentElement
  ) {
    super((observer) => {
      const resize = new ResizeObservable();
      resize.add(element);
      const sub = resize.subscribe((e) => {
        const viewSize: ViewSize = {
          width: e.contentRect.width,
          height: e.contentRect.height,
        };
        for (const condition of conditions) {
          if (condition[0](viewSize)) {
            const result = condition[1]();
            observer.next(result);
            return;
          }
        }
        observer.next(undefined);
      });
      return () => {
        sub.unsubscribe();
        resize.remove(element);
      };
    });
  }
}
