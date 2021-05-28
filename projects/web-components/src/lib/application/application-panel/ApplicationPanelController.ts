import { NgZone } from '@angular/core';
import { ApplicationPanelComponent } from './application-panel.component';
import {
  Observable,
  BehaviorSubject,
  of,
  isObservable,
  Subscription,
} from 'rxjs';
import { Resolvable } from '../Resolvable';

export interface IApplicationPanelControllerOptions {
  allowToggle: Resolvable<boolean>;
  lockOpen: Resolvable<boolean>;
  /* opened: boolean;
   readonly openedChange: Observable<boolean>;*/
}

export interface IApplicationPanelController
  extends IApplicationPanelControllerOptions {
  readonly isOpen: boolean;
  readonly isOpenChange: Observable<boolean>;
  readonly isLockedOpen: boolean;
  readonly canOpen: boolean;
  readonly canOpenChange: Observable<boolean>;
  readonly canToggle: boolean;
  readonly canToggleChange: Observable<boolean>;
  open(): void;
  close(): void;
  toggle(): void;
  /*readonly canToggle: boolean;
  readonly canToggleChange: Observable<boolean>;
  readonly canOpen: boolean;
  readonly isOpen: boolean;
  readonly canOpenChange: Observable<boolean>;*/
}

export interface IInternalApplicationPanelController {
  appPanelComponent?: ApplicationPanelComponent;
  readonly allowToggleChange: Observable<boolean>;
  readonly lockOpenChange: Observable<boolean>;
  elementCount: number;
  /*isOpen: boolean;
  canToggle: boolean;
  canOpen: boolean;
  trayHasContent: boolean;
  readonly trayHasContentChange: Observable<boolean>;
  */
}

export class ApplicationPanelController
  implements IApplicationPanelController, IInternalApplicationPanelController
{
  private _appPanelComponent?: ApplicationPanelComponent;
  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _canOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _canToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  //private _allowToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _opened: boolean = false;
  private _openedDebounce: number = 0;
  private _elementCount: number = 0;

  constructor(private readonly zone: NgZone) {}

  public get appPanelComponent(): ApplicationPanelComponent | undefined {
    return this._appPanelComponent;
  }

  public set appPanelComponent(val: ApplicationPanelComponent | undefined) {
    this._appPanelComponent = val;
  }

  public get elementCount(): number {
    return this._elementCount;
  }

  public set elementCount(val: number) {
    if (this._elementCount !== val) {
      this._elementCount = val;
      this.invalidateOpenState();
    }
  }

  public get isOpenChange(): Observable<boolean> {
    return this._isOpen.asObservable();
  }

  private _allowToggle: Resolvable<boolean> = true;
  private _allowToggleSub: Subscription = new Subscription();
  private _allowToggleChange: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public get allowToggleChange(): Observable<boolean> {
    return this._allowToggleChange.asObservable();
  }

  public get allowToggle(): Resolvable<boolean> {
    return this._allowToggle;
  }

  public set allowToggle(val: Resolvable<boolean>) {
    if (this._allowToggle !== val) {
      this._allowToggle = val;
      this._allowToggleSub.unsubscribe();
      const obs = isObservable(val) ? val : of(val);
      this._allowToggleSub = obs.subscribe((v) => {
        this._allowToggleChange.next(v);
        this.invalidateOpenState();
      });
    }
  }

  private _lockOpen: Resolvable<boolean> = false;
  private _lockOpenSub: Subscription = new Subscription();
  private _lockOpenChange: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get lockOpenChange(): Observable<boolean> {
    return this._lockOpenChange.asObservable();
  }

  public get isLockedOpen(): boolean {
    return this._lockOpenChange.value;
  }

  public get lockOpen(): Resolvable<boolean> {
    return this._lockOpen;
  }

  public set lockOpen(val: Resolvable<boolean>) {
    if (this._lockOpen !== val) {
      this._lockOpen = val;
      this._lockOpenSub.unsubscribe();
      const obs = isObservable(val) ? val : of(val);
      this._lockOpenSub = obs.subscribe((v) => {
        this._lockOpenChange.next(v);
        this.invalidateOpenState();
      });
    }
  }

  public get canToggleChange(): Observable<boolean> {
    return this._allowToggleChange.asObservable();
  }

  public get canToggle(): boolean {
    return this._canToggle.value;
  }

  public get canOpenChange(): Observable<boolean> {
    return this._canOpen.asObservable();
  }

  public get isOpen(): boolean {
    return this._isOpen.value;
  }

  public get canOpen(): boolean {
    return this._canOpen.value;
  }

  public open() {
    if (!this._opened && this.allowToggle) {
      this._opened = true;
      this.invalidateOpenState();
    }
  }

  public close() {
    if (this._opened && this.allowToggle) {
      this._opened = false;
      this.invalidateOpenState();
    }
  }

  public toggle() {
    if (this.allowToggle) {
      this._opened = !this._opened;
      this.invalidateOpenState();
    }
  }

  private invalidateOpenState() {
    cancelAnimationFrame(this._openedDebounce);
    this._openedDebounce = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.validateOpenState();
      });
    });
  }

  private validateOpenState() {
    const hasElements = this._elementCount > 0;
    const lockOpen = this._lockOpenChange.value;
    const canToggle = this._allowToggleChange.value && hasElements && !lockOpen;
    const canOpen = hasElements;
    const isOpen = canOpen && (lockOpen || this._opened);

    if (this._canToggle.value !== canToggle) {
      this._canToggle.next(canToggle);
    }

    if (this._canOpen.value !== canOpen) {
      this._canOpen.next(canOpen);
    }

    this._isOpen.next(isOpen);
  }
}
