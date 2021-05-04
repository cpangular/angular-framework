import { ModalInOutAnimation } from './animations/modal';
import { Subscription } from 'rxjs';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostBinding, Input, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { IApplicationLayoutComponent } from './IApplicationLayoutComponent';
import { ApplicationService } from '../application/application.service';
import { BreakpointService } from '@cpangular/web-cdk';

@Component({
  selector: 'cp-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss'],
  animations: [
    ModalInOutAnimation
  ]
})
export class ApplicationLayoutComponent implements IApplicationLayoutComponent, OnInit, OnDestroy {
  private _hideHeaderOnScroll: boolean = false;
  private _scrollSubs: Subscription = new Subscription();
  private _subs: Subscription = new Subscription();
  private _scrollValue: number = 0;
  private _scrollDispatcher!: ScrollDispatcher;
  private _scrollElm!: ElementRef<HTMLElement>;
  private _headerHidden: boolean = false;
  private _orientation: 'landscape' | 'portrait' = 'landscape';
  private _screenSize: number = 0;
  private _showingModalRoute: boolean = false;

  public leftPanelOpened: boolean = true;
  public rightPanelOpened: boolean = true;



  @HostBinding('class.landscape')
  public get isLandscape(): boolean {
    return this._orientation === 'landscape';
  }

  @HostBinding('class.portrait')
  public get isPortrait(): boolean {
    return !this.isLandscape;
  }

  @HostBinding('class.modal')
  public get showModalBg(): boolean {
    return this._showingModalRoute
      || (this.leftPanelOpened && this._screenSize <= 2)
      || (this.rightPanelOpened && this._screenSize <= 2)
  }

  @ViewChild('contentContainer', { static: true, read: CdkScrollable })
  private contentContainer!: CdkScrollable;

  public get hideHeaderOnScroll(): boolean {
    return this._hideHeaderOnScroll;
  }

  public set hideHeaderOnScroll(val: boolean) {
    if (this._hideHeaderOnScroll !== val) {
      this._hideHeaderOnScroll = val;
      if (this._scrollDispatcher) {
        this.hideHeaderOnScroll ? this.enableHeaderScrollHide() : this.disableHeaderScrollHide();
      }
    }
  }

  public get headerHidden(): boolean {
    return this._headerHidden;
  }


  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    private readonly appService: ApplicationService,
    private readonly breakpointService: BreakpointService
  ) {
    this._subs.add(appService.leftPanel.openedChange.subscribe(o => {
      this.leftPanelOpened = o;
    }));
    this._subs.add(appService.rightPanel.openedChange.subscribe(o => {
      this.rightPanelOpened = o;
    }));

    const orientationResolver = breakpointService.createResolver<'landscape' | 'portrait'>([
      ['landscape', 'landscape'],
      ['portrait', 'portrait']
    ]);
    this._subs.add(orientationResolver.subscribe(value => {
      this._orientation = value;
    }));

    const screenSizeResolver = breakpointService.createResolver<number>([
      ['xs', 0],
      ['sm', 1],
      ['md', 2],
      ['lg', 3],
      ['xl', 4]
    ]);

    this._subs.add(screenSizeResolver.subscribe(value => {
      this._screenSize = value;
      this.elementRef.nativeElement.classList.remove('size-xs');
      this.elementRef.nativeElement.classList.remove('size-sm');
      this.elementRef.nativeElement.classList.remove('size-md');
      this.elementRef.nativeElement.classList.remove('size-lg');
      this.elementRef.nativeElement.classList.remove('size-xl');
      switch (value) {
        case 0:
          this.elementRef.nativeElement.classList.add('size-xs');
          break;
        case 1:
          this.elementRef.nativeElement.classList.add('size-sm');
          break;
        case 2:
          this.elementRef.nativeElement.classList.add('size-md');
          break;
        case 3:
          this.elementRef.nativeElement.classList.add('size-lg');
          break;
        case 4:
          this.elementRef.nativeElement.classList.add('size-xl');
          break;
      }
    }));
  }

  @HostBinding('class.left-panel-inline')
  public get leftPanelInline(): boolean {
    return this._screenSize > 2;
  }

  @HostBinding('class.right-panel-inline')
  public get rightPanelInline(): boolean {
    return this._screenSize > 2;
  }


  ngOnInit() {
    this._scrollElm = this.contentContainer.getElementRef();
    this._scrollValue = this._scrollElm.nativeElement.scrollTop;
    this._scrollDispatcher = (this.contentContainer as any).scrollDispatcher;
    this.hideHeaderOnScroll ? this.enableHeaderScrollHide() : this.disableHeaderScrollHide();
  }

  private enableHeaderScrollHide() {

    this._scrollSubs.add(this._scrollDispatcher.scrolled(100).subscribe(_ => {
      this.ngZone.run(() => {
        const scrollV = this._scrollElm.nativeElement.scrollTop;
        const diff = this._scrollValue - scrollV;
        if (Math.abs(diff) > 100) {
          if (!this._headerHidden && diff < 0) {
            this._headerHidden = true;
            this.elementRef.nativeElement.classList.add('hide-header');
            this.changeDetectorRef.markForCheck();
          } else if (this._headerHidden && diff > 0) {
            this._headerHidden = false;
            this.elementRef.nativeElement.classList.remove('hide-header');
            this.changeDetectorRef.markForCheck();
          }
          this._scrollValue = scrollV;
        }
      });
    }));
  }
  private disableHeaderScrollHide() {
    this._scrollSubs.unsubscribe();
    this._scrollSubs = new Subscription();
  }

  public ngOnDestroy() {
    this.disableHeaderScrollHide();
    this._subs.unsubscribe();
  }

  public handleContentAreaResize(resize: ResizeObserverEntry) {
    const varTarget = this.elementRef.nativeElement;
    const target = resize.target as HTMLElement;
    const parent = target.parentElement as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const scrollBarWidth = this._scrollElm.nativeElement.offsetWidth - this._scrollElm.nativeElement.clientWidth;

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
}
