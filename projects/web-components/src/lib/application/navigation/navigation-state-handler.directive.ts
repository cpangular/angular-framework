import { Subscription } from 'rxjs';
import { NavigationService } from './navigation.service';
import { NavigationState } from './NavigationState';
import {
  Directive,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RoutesRecognized,
  NavigationCancel,
  NavigationEnd,
  RouterEvent,
} from '@angular/router';

@Directive({
  selector: 'router-outlet[cpNavigationStateHandler]',
})
export class NavigationStateHandlerDirective implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('cpNavigationStateHandler')
  public state: EventEmitter<RouterEvent> = new EventEmitter();

  private _routerSub: Subscription = new Subscription();

  constructor(
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService
  ) {}
  public activate(event: RoutesRecognized) {
    this.state.emit(event);
    this._routerSub.add(
      this.router.events.subscribe((e) => {
        this.state.emit(e as RouterEvent);
      })
    );
  }
  public deactivate(event: NavigationEnd | NavigationCancel) {
    this.state.emit(event);
    this._routerSub.unsubscribe();
    this._routerSub = new Subscription();
  }

  ngOnDestroy(): void {
    this.navigationService.removeNavigationEventsDirective(this);
    this._routerSub.unsubscribe();
  }
  ngOnInit(): void {
    this.navigationService.addNavigationEventsDirective(this);
  }
}
