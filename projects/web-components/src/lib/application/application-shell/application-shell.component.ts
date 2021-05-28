import {
  NavigationState,
  NavigateStateInfo,
} from './../navigation/NavigationState';
import {
  RouterEvent,
  RoutesRecognized,
  GuardsCheckStart,
  ResolveStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { MaterialApplicationPartsComponent } from './../../material-application-parts/material-application-parts.component';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationLayoutComponent } from '../../application-layout/application-layout.component';
import { IApplicationLayoutComponent } from '../application-layout/IApplicationLayoutComponent';
import { ApplicationService } from '../application.service';
import { ApplicationLayoutOptions } from './application-layout-options';

@Component({
  selector: 'cp-application-shell',
  templateUrl: './application-shell.component.html',
  styleUrls: ['./application-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationShellComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.application-shell')
  private class = true;

  public mainNavigationState?: NavigateStateInfo;
  public modalNavigationState?: NavigateStateInfo;

  private _subs: Subscription = new Subscription();
  private _applicationLayoutOptions?: ApplicationLayoutOptions;
  private _applicationLayoutRef?: ComponentRef<IApplicationLayoutComponent>;
  private _modalRouteActive: boolean = false;
  private _applicationComponents: Type<any>[] = [
    MaterialApplicationPartsComponent,
  ];

  @ViewChild('layoutRef', { static: true, read: ViewContainerRef })
  private layoutRef!: ViewContainerRef;

  public get applicationLayout(): Type<any> {
    return this.appService.layout.value ?? ApplicationLayoutComponent;
  }

  @Input()
  public get applicationLayoutOptions(): ApplicationLayoutOptions | undefined {
    return this._applicationLayoutOptions;
  }

  @Input()
  public get applicationComponents(): Type<any>[] {
    return this._applicationComponents;
  }
  public set applicationComponents(val: Type<any>[]) {
    this._applicationComponents = val;
  }

  public set applicationLayoutOptions(
    val: ApplicationLayoutOptions | undefined
  ) {
    this._applicationLayoutOptions = val;
  }

  public get modalRouteActive(): boolean {
    return this._modalRouteActive;
  }
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appService: ApplicationService,
    changeRef: ChangeDetectorRef
  ) {
    this._subs.add(appService.layout.subscribe(() => changeRef.markForCheck()));
  }

  ngOnInit() {
    this._subs.add(
      this.appService.layout.subscribe((layout) => {
        this.createLayout();
      })
    );
    this.applyLayoutOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.applicationLayout &&
      !changes.applicationLayout.isFirstChange()
    ) {
      this.createLayout();
    }
    if (
      changes.applicationLayoutOptions &&
      !changes.applicationLayoutOptions.isFirstChange()
    ) {
      this.applyLayoutOptions();
    }
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  private createLayout() {
    if (this._applicationLayoutRef) {
      this._applicationLayoutRef.destroy();
    }
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        this.applicationLayout
      );
    this.layoutRef.clear();
    this._applicationLayoutRef =
      this.layoutRef.createComponent(componentFactory);
  }

  private applyLayoutOptions() {
    this.applicationLayoutOptions ??= {
      hideHeaderOnScroll: true,
    };
    for (const key in this.applicationLayoutOptions) {
      if (
        Object.prototype.hasOwnProperty.call(this.applicationLayoutOptions, key)
      ) {
        const val = (this.applicationLayoutOptions as any)[key];
        (this._applicationLayoutRef!.instance as any)[key] = val;
      }
    }
  }

  public mainRouterEvent(evt: RouterEvent) {
    switch (evt.constructor) {
      case RoutesRecognized:
        this.mainNavigationState = {
          state: NavigationState.Navigation,
          event: evt,
          url: (evt as RoutesRecognized).urlAfterRedirects,
          label: 'Navigation',
        };
        break;
      case GuardsCheckStart:
        this.mainNavigationState = {
          state: NavigationState.GuardCheck,
          event: evt,
          url: (evt as GuardsCheckStart).urlAfterRedirects,
          label: 'Authentication',
        };
        break;
      case ResolveStart:
        this.mainNavigationState = {
          state: NavigationState.Resolve,
          event: evt,
          url: (evt as ResolveStart).urlAfterRedirects,
          label: 'Resolve',
        };
        break;
      case NavigationCancel:
      case NavigationEnd:
        this.mainNavigationState = undefined;
        break;
      case NavigationError:
        this.mainNavigationState = {
          state: NavigationState.Error,
          event: evt,
          url: this.mainNavigationState?.url ?? '',
          label: 'Error',
        };
        break;
    }
  }

  public modalRouterEvent(evt: RouterEvent) {
    switch (evt.constructor) {
      case RoutesRecognized:
        this.modalNavigationState = {
          state: NavigationState.Navigation,
          event: evt,
          url: (evt as RoutesRecognized).urlAfterRedirects,
          label: 'Navigation',
        };
        break;
      case GuardsCheckStart:
        this.modalNavigationState = {
          state: NavigationState.GuardCheck,
          event: evt,
          url: (evt as GuardsCheckStart).urlAfterRedirects,
          label: 'Authentication',
        };
        break;
      case ResolveStart:
        this.modalNavigationState = {
          state: NavigationState.Resolve,
          event: evt,
          url: (evt as ResolveStart).urlAfterRedirects,
          label: 'Resolve',
        };
        break;
      case NavigationCancel:
      case NavigationEnd:
        this.modalNavigationState = undefined;
        break;
      case NavigationError:
        this.modalNavigationState = {
          state: NavigationState.Error,
          event: evt,
          url: this.mainNavigationState?.url ?? '',
          label: 'Error',
        };
        break;
    }
  }

  public modalOutletDeactivate(evt: any) {
    this._modalRouteActive = false;
  }

  public modalOutletActivate(evt: any) {
    this._modalRouteActive = true;
  }
}
