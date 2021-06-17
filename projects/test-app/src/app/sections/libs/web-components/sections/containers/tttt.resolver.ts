import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TtttResolver implements Resolve<any> {
  constructor() {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((res) => {
      setTimeout(res, 1000);
    });
  }
}
