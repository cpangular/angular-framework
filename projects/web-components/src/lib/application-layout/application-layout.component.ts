import { NavigateStateInfo, NavigationState } from './../application/navigation/NavigationState';
import { LoadingInOutAnimation } from './animations/loading';
import { Router, RouterOutlet, RoutesRecognized, GuardsCheckStart, ResolveStart, RouterEvent, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointService } from '@cpangular/web-cdk';
import { Subscription } from 'rxjs';
import { ApplicationLayout } from '../application/application-layout/application-layout';
import { IApplicationLayoutComponent } from '../application/application-layout/IApplicationLayoutComponent';
import { ApplicationService } from '../application/application.service';
import { LayoutBreakpoints } from './../application/application-layout/application-layout';
import { ModalInOutAnimation } from './animations/modal';

@Component({
  selector: 'cp-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss'],
  animations: [
    ModalInOutAnimation,
    LoadingInOutAnimation
  ]
})
export class ApplicationLayoutComponent extends ApplicationLayout implements IApplicationLayoutComponent, OnInit, OnDestroy {

  private _subs: Subscription = new Subscription();
  private _showingModalRoute: boolean = false;

  public mainNavigationState?: NavigateStateInfo;
  public modalNavigationState?: NavigateStateInfo;

  @HostBinding('class.left-panel-inline')
  public get leftPanelInline(): boolean {
    if (this.appService.leftPanel.isLockedOpen) {
      return true;
    }
    return this.breakpoint > LayoutBreakpoints.md;
  }

  @HostBinding('class.right-panel-inline')
  public get rightPanelInline(): boolean {
    if (this.appService.rightPanel.isLockedOpen) {
      return true;
    }
    return this.breakpoint > LayoutBreakpoints.md;
  }

  @HostBinding('class.modal')
  public get showModalBg(): boolean {
    return this._showingModalRoute
      || (this.appService.leftPanel.isOpen && !this.leftPanelInline)
      || (this.appService.rightPanel.isOpen && !this.rightPanelInline)
  }
  @HostBinding('attr.modalSize')
  protected get modalSize(): string {
    if (this._showingModalRoute) {
      return 'full';
    }
    return 'content';
  }


  @ViewChild('content', { static: true, read: CdkScrollable })
  public contentContainer!: CdkScrollable;


  constructor(
    breakpointService: BreakpointService,
    router: Router,
    private readonly elementRef: ElementRef<HTMLElement>,
    public readonly appService: ApplicationService,
  ) {
    super(breakpointService, router);
  }

  ngOnInit() {

  }


  public ngOnDestroy() {

    this._subs.unsubscribe();
  }

  public handleContentAreaResize(resize: ResizeObserverEntry) {
    const varTarget = this.elementRef.nativeElement;
    const target = resize.target as HTMLElement;
    const parent = target.parentElement as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const scrollElm = this.contentContainer.getElementRef().nativeElement;
    const scrollBarWidth = scrollElm.offsetWidth - scrollElm.clientWidth;

    const pWidth = parentRect.width;
    const pHeight = parentRect.height;

    const left = targetRect.left;
    const top = targetRect.top;
    const width = targetRect.width;
    const height = targetRect.height;
    const right = pWidth - targetRect.right;
    const bottom = pHeight - targetRect.bottom;

    varTarget.style.setProperty('--content-left', left + 'px');
    varTarget.style.setProperty('--content-right', right + 'px');
    varTarget.style.setProperty('--content-top', top + 'px');
    varTarget.style.setProperty('--content-bottom', bottom + 'px');
    varTarget.style.setProperty('--content-width', width + 'px');
    varTarget.style.setProperty('--content-height', height + 'px');
    varTarget.style.setProperty('--scrollbar-width', scrollBarWidth + 'px');
  }

  public modalOutletDeactivate(evt: any) {
    this._showingModalRoute = false;
  }

  public modalOutletActivate(evt: any) {
    this._showingModalRoute = true;
  }
  public mainOutletActivate(evt: any) {
    //console.log('mainOutletActivate', evt)

  }

  public mainOutletDeactivate(evt: any) {
    //console.log('>>> mainOutletDeactivate', evt)

  }

  public mainRouterEvent(evt: RouterEvent) {

    switch (evt.constructor) {
      case RoutesRecognized:
        this.mainNavigationState = {
          state: NavigationState.Navigation,
          event: evt,
          url: (evt as RoutesRecognized).urlAfterRedirects,
          label: 'Navigation'
        };
        break;
      case GuardsCheckStart:
        this.mainNavigationState = {
          state: NavigationState.GuardCheck,
          event: evt,
          url: (evt as GuardsCheckStart).urlAfterRedirects,
          label: 'Authentication'
        };
        break;
      case ResolveStart:
        this.mainNavigationState = {
          state: NavigationState.Resolve,
          event: evt,
          url: (evt as ResolveStart).urlAfterRedirects,
          label: 'Resolve'
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
          label: 'Error'
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
          label: 'Navigation'
        };
        break;
      case GuardsCheckStart:
        this.modalNavigationState = {
          state: NavigationState.GuardCheck,
          event: evt,
          url: (evt as GuardsCheckStart).urlAfterRedirects,
          label: 'Authentication'
        };
        break;
      case ResolveStart:
        this.modalNavigationState = {
          state: NavigationState.Resolve,
          event: evt,
          url: (evt as ResolveStart).urlAfterRedirects,
          label: 'Resolve'
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
          label: 'Error'
        };
        break;

    }

  }

}
