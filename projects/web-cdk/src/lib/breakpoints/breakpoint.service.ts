import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import {
  BreakpointCheckFn,
  BreakpointCompareFn,
  Breakpoints,
  BreakpointObservable,
  BreakpointExpression,
  BreakpointResolver,
} from '@cpangular/web-utils';

import { Observable, OperatorFunction } from 'rxjs';

function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable((observer) => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}

const xs = Breakpoints.custom(-1, 599);
const sm = Breakpoints.custom(600, 1023);
const md = Breakpoints.custom(1024, 1439);
const lg = Breakpoints.custom(1440, 1919);
const xl = Breakpoints.custom(1920, -1);

const DEFAULT_BREAKPOINTS: Record<string, BreakpointCheckFn> = {
  '': () => true,
  xs: xs.eq,
  'gt-xs': xs.gt,
  'gte-xs': xs.gtEq,
  'lt-sm': sm.lt,
  'lte-sm': sm.ltEq,
  sm: sm.eq,
  'gt-sm': sm.gt,
  'gte-sm': sm.gtEq,
  'lt-md': md.lt,
  'lte-md': md.ltEq,
  md: md.eq,
  'gt-md': md.gt,
  'gte-md': md.gtEq,
  'lt-lg': lg.lt,
  'lte-lg': lg.ltEq,
  lg: lg.eq,
  'gt-lg': lg.gt,
  'gte-lg': lg.gtEq,
  'lt-xl': xl.lt,
  'lte-xl': xl.ltEq,
  xl: xl.eq,
  landscape: Breakpoints.landscape.eq,
  portrait: Breakpoints.portrait.eq,
};

const BREAKPOINTS = new InjectionToken('Breakpoints', {
  providedIn: 'root',
  factory: (): Record<string, BreakpointCheckFn> => DEFAULT_BREAKPOINTS,
});

interface BreakpointOptions {
  element?: HTMLElement;
  breakpointDict?: Record<string, BreakpointCheckFn>;
}

class ZoneAwareBreakpointObservable
  extends Observable<number>
  implements BreakpointObservable
{
  private bpo: BreakpointObservable;
  private zone: NgZone;
  constructor(
    zone: NgZone,
    bpCompare: BreakpointCompareFn | BreakpointCheckFn,
    element?: HTMLElement
  ) {
    const bpo = new BreakpointObservable(bpCompare, element);
    const bpoZone = bpo.pipe(runInZone(zone));
    super((obs) => {
      const sub = bpoZone.subscribe((v) => {
        obs.next(v);
      });
      return () => {
        sub.unsubscribe();
      };
    });
    this.bpo = bpo;
    this.zone = zone;
  }

  get eq(): Observable<boolean> {
    return this.bpo.eq.pipe(runInZone(this.zone));
  }

  get not(): Observable<boolean> {
    return this.bpo.not.pipe(runInZone(this.zone));
  }

  get lt(): Observable<boolean> {
    return this.bpo.lt.pipe(runInZone(this.zone));
  }

  get ltEq(): Observable<boolean> {
    return this.bpo.ltEq.pipe(runInZone(this.zone));
  }

  get gt(): Observable<boolean> {
    return this.bpo.gt.pipe(runInZone(this.zone));
  }

  get gtEq(): Observable<boolean> {
    return this.bpo.gtEq.pipe(runInZone(this.zone));
  }
}

class ZoneAwareBreakpointResolver<T> extends Observable<T> {
  constructor(
    zone: NgZone,
    conditions: BreakpointExpression[],
    dict: Record<string, BreakpointCheckFn> = {},
    element?: Element
  ) {
    const bpr = new BreakpointResolver<T>(conditions, dict, element);
    const bprZone = bpr.pipe(runInZone(zone));
    super((obs) => {
      const sub = bprZone.subscribe((v) => {
        obs.next(v);
      });
      return () => {
        sub.unsubscribe();
      };
    });
  }
}

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(
    @Inject(BREAKPOINTS)
    private readonly defaultBreakpoints: Record<string, BreakpointCheckFn>,
    private readonly zone: NgZone
  ) {}

  public createObservable(
    bp: string | BreakpointCompareFn | BreakpointCheckFn,
    opts?: BreakpointOptions
  ): BreakpointObservable {
    if (typeof bp === 'string') {
      const dict = Object.assign(
        {},
        DEFAULT_BREAKPOINTS,
        this.defaultBreakpoints ?? {},
        opts?.breakpointDict ?? {}
      );
      if (!dict[bp]) {
        throw new Error(`No breakpoint with name "${bp}" defined.`);
      }
      return new ZoneAwareBreakpointObservable(
        this.zone,
        dict[bp],
        opts?.element
      );
    }
    return new ZoneAwareBreakpointObservable(this.zone, bp, opts?.element);
  }

  public createResolver<T>(
    conditions: BreakpointExpression<T>[],
    opts?: BreakpointOptions
  ): BreakpointResolver<T> {
    const dict = Object.assign(
      {},
      DEFAULT_BREAKPOINTS,
      this.defaultBreakpoints ?? {},
      opts?.breakpointDict ?? {}
    );
    return new ZoneAwareBreakpointResolver<T>(
      this.zone,
      conditions,
      dict,
      opts?.element
    ) as BreakpointResolver<T>;
  }
}
