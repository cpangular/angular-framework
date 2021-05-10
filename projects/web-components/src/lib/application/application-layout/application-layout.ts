import { map } from 'rxjs/operators';
import { BreakpointService } from '@cpangular/web-cdk';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Directive, HostBinding, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BreakpointResolver } from '@cpangular/web-utils';
import { IApplicationLayoutComponent } from './IApplicationLayoutComponent';
import { Router, RoutesRecognized, Scroll } from '@angular/router';
import { NavigationState } from '../navigation/NavigationState';
import { NavigationStateObservable } from '../navigation/NavigationStateObservable';


export enum LayoutBreakpoints {
  xs,
  sm,
  md,
  lg,
  xl
}


@Directive()
export abstract class ApplicationLayout implements IApplicationLayoutComponent, OnDestroy {
  private __subs: Subscription = new Subscription();

  private breakpointsResolve: BreakpointResolver<string[]> = this.breakpointService.createResolver([
    ['xs', ['xs', 'gte-xs', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl']],
    ['sm', ['sm', 'lte-sm', 'gte-sm', 'gt-xs', 'gte-xs', 'lt-md', 'lt-lg', 'lt-xl']],
    ['md', ['md', 'lte-md', 'gte-md', 'gt-sm', 'gte-sm', 'gt-xs', 'gte-xs', 'lt-lg', 'lt-xl']],
    ['lg', ['lg', 'lte-lg', 'gte-lg', 'gte-md', 'gt-md', 'gt-sm', 'gte-sm', 'gt-xs', 'gte-xs', 'lt-xl']],
    ['xl', ['xl', 'lte-xl', 'gte-lg', 'gt-lg', 'gte-md', 'gt-md', 'gt-sm', 'gte-sm', 'gt-xs', 'gte-xs']],
  ]);

  private orientationResolve: BreakpointResolver<string[]> = this.breakpointService.createResolver([
    ['landscape', ['landscape']],
    ['portrait', ['portrait']]
  ]);



  public breakpointClasses: string[] = [];
  public orientationClasses: string[] = [];


  public _breakpoint: LayoutBreakpoints = LayoutBreakpoints.xs;
  public breakpointChange: EventEmitter<LayoutBreakpoints> = new EventEmitter();
  public get breakpoint(): LayoutBreakpoints {
    return this._breakpoint;
  }
  public set breakpoint(val: LayoutBreakpoints) {
    if (this._breakpoint !== val) {
      this._breakpoint = val;
      this.breakpointChange.emit(val);
    }
  }

  public _orientation: string = 'landscape';
  public orientationChange: EventEmitter<string> = new EventEmitter();
  public get orientation(): string {
    return this._orientation;
  }
  public set orientation(val: string) {
    if (this._orientation !== val) {
      this._orientation = val;
      this.orientationChange.emit(val);
    }
  }


  @HostBinding('class')
  public get classes(): string[] {
    return [...this.breakpointClasses, ...this.orientationClasses];
  }

  constructor(
    protected readonly breakpointService: BreakpointService,
    protected readonly router: Router,
  ) {
    this.__subs.add(this.breakpointsResolve.subscribe(v => {
      const bp = v[0];
      this.breakpointClasses = v;
      const a = LayoutBreakpoints[bp as any];
      this.breakpoint = (LayoutBreakpoints as any)[bp as any];
    }))
    this.__subs.add(this.orientationResolve.subscribe(v => {
      this.orientationClasses = v;
      this.orientation = v[0];
    }));


  }

  ngOnDestroy() {
    this.__subs.unsubscribe();
  }

}
