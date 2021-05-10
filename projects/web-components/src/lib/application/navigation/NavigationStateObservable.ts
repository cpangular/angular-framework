import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, GuardsCheckEnd, GuardsCheckStart, NavigationError, ResolveStart, ResolveEnd, RouterEvent } from '@angular/router';
import { NavigationState } from './NavigationState';

export class NavigationStateObservable extends Observable<NavigationState> {
  private subject!: Observable<NavigationState>;
  private _state: NavigationState = NavigationState.None;
  private _evt?: RouterEvent;
  constructor(router: Router) {
    super(obs => {
      this.init(router);
      const sub = this.subject.subscribe(obs);
      return () => sub.unsubscribe();
    });
  }

  public get currentState(): NavigationState {
    return this._state;
  }
  private init(router: Router) {

    if (!this.subject) {
      this.subject = new Observable<NavigationState>(obs => {
        const sub = router.events.subscribe(evt => {
          const type = evt.constructor;
          switch (type) {
            case NavigationStart:
              this._state = NavigationState.Navigation;
              this._evt = evt as NavigationStart;
              obs.next(this._state);
              break;
            case GuardsCheckStart:
              this._state = NavigationState.GuardCheck;
              this._evt = evt as GuardsCheckStart;
              obs.next(this._state);
              break;
            case GuardsCheckEnd:
              this._state = NavigationState.Navigation;

              obs.next(this._state);
              break;
            case ResolveStart:
              this._state = NavigationState.Resolve;
              obs.next(this._state);
              break;
            case ResolveEnd:
              this._state = NavigationState.Navigation;
              obs.next(this._state);
              break;
            case NavigationEnd:
              this._state = NavigationState.None;
              obs.next(this._state);
              break;
            case NavigationCancel:
              this._state = NavigationState.None;
              obs.next(this._state);
              break;
            case NavigationError:
              this._state = NavigationState.Error;
              obs.next(this._state);
              break;
          }
        });
        return () => sub.unsubscribe();
      }).pipe(share());
    }
  }
}
