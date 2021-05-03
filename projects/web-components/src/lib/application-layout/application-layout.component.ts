import { Subscription } from 'rxjs';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, HostBinding, Input, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { IApplicationLayoutComponent } from './IApplicationLayoutComponent';
import { ApplicationService } from '../application/application.service';

@Component({
  selector: 'cp-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss']
})
export class ApplicationLayoutComponent implements IApplicationLayoutComponent, OnInit, OnDestroy {
  private _hideHeaderOnScroll: boolean = false;
  private _scrollSubs: Subscription = new Subscription();
  private _subs: Subscription = new Subscription();
  private _scrollValue: number = 0;
  private _scrollDispatcher!: ScrollDispatcher;
  private _scrollElm!: ElementRef<HTMLElement>;
  private _headerHidden: boolean = false;
  private requireModal: Set<string> = new Set();

  public leftPanelOpened: boolean = true;
  public rightPanelOpened: boolean = true;





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
    private readonly appService: ApplicationService
  ) {
    this._subs.add(appService.leftPanel.openedChange.subscribe(o => {
      this.leftPanelOpened = o;
    }));
    this._subs.add(appService.rightPanel.openedChange.subscribe(o => {
      this.rightPanelOpened = o;
     }));
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
    console.log(evt);
    this.requireModal.delete('modal');
  }

  public modalOutletActivate(evt: any) {
    console.log(evt);
    this.requireModal.add('modal');
  }
}
