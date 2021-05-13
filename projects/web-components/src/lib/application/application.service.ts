import { ResolveStackMap } from '@cpangular/web-utils';
import { Injectable, Type, NgZone } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationHeaderController, IApplicationHeaderController } from './application-header/ApplicationHeaderController';
import { IApplicationLayoutComponent } from './application-layout/IApplicationLayoutComponent';
import { ApplicationPanelController, IApplicationPanelController } from './application-panel/ApplicationPanelController';


class ApplicationProperty<T>{
  protected _change: BehaviorSubject<T>;

  constructor(startValue: T) {
    this._change = new BehaviorSubject(startValue);
  }

  public get valueChange(): Observable<T> {
    return this._change.asObservable();
  }

  public get value(): T {
    return this._change.value;
  }

  public set value(val: T) {
    if (this.value !== val) {
      this._change.next(val);
    }
  }
}




class ApplicationTitle extends ApplicationProperty<string>{
  constructor() {
    super('');
    this.valueChange.subscribe(title => {
      document.title = title;
    });
  }
}

export interface INavigationController {

}


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

export class NavigationController implements INavigationController {
  //  public readonly navigationState: NavigationStateObservable = new NavigationStateObservable(this.router);
  constructor(
    private readonly router: Router
  ) {
    router.events.subscribe(e => {
      if (e instanceof RoutesRecognized) {
        const old = flattenActivatedRoute(router.routerState.root.snapshot);
        const cur = flattenActivatedRoute(e.state.root);
        const lastMatch = matchesUntil(old, cur);
        const match = lastMatch === -1 ? null : old[lastMatch];


      }
    });

  }
}

export class ApplicationLayoutResolver extends ResolveStackMap<ActivatedRoute, Type<IApplicationLayoutComponent>>{

}



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public readonly title: ApplicationTitle = new ApplicationTitle();

  public readonly layout: ApplicationLayoutResolver = new ApplicationLayoutResolver();

  public readonly header: IApplicationHeaderController = new ApplicationHeaderController();
  public readonly leftPanel: IApplicationPanelController = new ApplicationPanelController(this.zone);
  public readonly rightPanel: IApplicationPanelController = new ApplicationPanelController(this.zone);
  public readonly topPanel: IApplicationPanelController = new ApplicationPanelController(this.zone);
  public readonly bottomPanel: IApplicationPanelController = new ApplicationPanelController(this.zone);
  public readonly navigation: INavigationController = new NavigationController(this.router);
  constructor(
    private readonly router: Router,
    private readonly zone: NgZone,
  ) { }





}
