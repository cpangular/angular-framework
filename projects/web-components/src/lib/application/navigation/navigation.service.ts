import { ActivatedRouteSnapshot, Router, RoutesRecognized, NavigationEnd, NavigationCancel } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavigationStateHandlerDirective } from './navigation-state-handler.directive';



function flattenActivatedRoute(r: ActivatedRouteSnapshot): ActivatedRouteSnapshot[] {
  const arr: ActivatedRouteSnapshot[] = [];
  arr.push(r);
  if (r.children.length) {
    for (const child of r.children) {
      arr.push(...flattenActivatedRoute(child));
    }
  }
  return arr;
}

function matchesUntil(aList: ActivatedRouteSnapshot[], bList: ActivatedRouteSnapshot[]): number {
  for (let i = 0; i < aList.length; i++) {
    const a = aList[i];
    const b = bList[i];
    if (a.routeConfig !== b.routeConfig) {
      return i - 1;
    }
  }
  return aList.length - 1;
}


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _eventDirectives: Set<NavigationStateHandlerDirective> = new Set();
  private target?: NavigationStateHandlerDirective;
  constructor(
    private readonly router: Router
  ) {
    router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        const old = flattenActivatedRoute(router.routerState.root.snapshot);
        const cur = flattenActivatedRoute(e.state.root);
        const lastMatch = matchesUntil(old, cur);
        const match = lastMatch === -1 ? null : old[lastMatch];
        const directives = Array.from(this._eventDirectives.values());
        for (const d of directives) {
          if (d.route.snapshot === match) {
            this.target = d;
            this.target.activate(e);
            return;
          }
        }
        this.target = directives[0];
        this.target.activate(e);
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel
      ) {
        this.target?.deactivate(e);
        this.target = undefined;
      }
    });

    // router.routerState.root (old) vs RoutesRecognized.state.root

    /*router.events.pipe(filter(e => e instanceof RouteConfigLoadEnd)).subscribe(e=>{
      console.log('router config changed', e);
    });*/

  }

  public addNavigationEventsDirective(d: NavigationStateHandlerDirective): void {
    console.log('addNavigationEventsDirective', d);
    this._eventDirectives.add(d);
  }

  public removeNavigationEventsDirective(d: NavigationStateHandlerDirective): void {
    this._eventDirectives.delete(d);
  }
}
