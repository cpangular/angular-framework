import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { ResizeObservable } from "../observers/resize/resize-observable";
import { BreakpointCompareFn } from "./BreakpointEvaluator";

export class BreakpointObservable extends Observable<number> {

  constructor(bpCompare: BreakpointCompareFn, element: HTMLElement = document.documentElement) {
    const resizeObs = new ResizeObservable();
    resizeObs.add(element);
    super(obs => {
      let match = bpCompare({ width: element.offsetWidth, height: element.offsetHeight });
      obs.next(match);
      const sub = resizeObs.subscribe(e => {
        const cmp = bpCompare({ width: e.contentRect.width, height: e.contentRect.height });
        if (match !== cmp) {
          match = cmp;
          obs.next(cmp);
        }
      });
      return () => {
        sub.unsubscribe();
      }
    });
  }

  public get eq(): Observable<boolean> {
    return this.pipe(map(v => v === 0), distinctUntilChanged());
  }

  public get not(): Observable<boolean> {
    return this.pipe(map(v => v !== 0), distinctUntilChanged());
  }

  public get lt(): Observable<boolean> {
    return this.pipe(map(v => v === -1), distinctUntilChanged());
  }

  public get ltEq(): Observable<boolean> {
    return this.pipe(map(v => v !== 1), distinctUntilChanged());
  }

  public get gt(): Observable<boolean> {
    return this.pipe(map(v => v === 1), distinctUntilChanged());
  }

  public get gtEq(): Observable<boolean> {
    return this.pipe(map(v => v !== -1), distinctUntilChanged());
  }

}
