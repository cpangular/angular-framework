import { Subscription, BehaviorSubject, Observable, isObservable, of } from 'rxjs';
import { Resolvable } from '../Resolvable';

export interface IApplicationPanelControllerOptions {
  hideOnScroll: Resolvable<boolean>;
}
export interface IApplicationHeaderController {
  isHideOnScroll: boolean;
  hideOnScrollChange: Observable<boolean>;
}

export class ApplicationHeaderController implements IApplicationHeaderController {

  private _hideOnScroll: Resolvable<boolean> = true;
  private _hideOnScrollSub: Subscription = new Subscription();
  private _hideOnScrollChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public get hideOnScrollChange(): Observable<boolean> {
    return this._hideOnScrollChange.asObservable();
  }

  public get isHideOnScroll(): boolean {
    return this._hideOnScrollChange.value;
  }

  public get hideOnScroll(): Resolvable<boolean> {
    return this._hideOnScroll;
  }

  public set hideOnScroll(val: Resolvable<boolean>) {
    if (this._hideOnScroll !== val) {
      this._hideOnScroll = val;
      this._hideOnScrollSub.unsubscribe();
      const obs = isObservable(val) ? val : of(val);
      this._hideOnScrollSub = obs.subscribe(v => {
        this._hideOnScrollChange.next(v);
      });
    }
  }



}
