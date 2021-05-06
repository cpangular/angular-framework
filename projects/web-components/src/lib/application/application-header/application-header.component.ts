import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationService } from './../application.service';


@Component({
  selector: 'cp-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationHeaderComponent implements OnInit, OnDestroy {
  private _subs: Subscription = new Subscription();
  private _scrollSubs: Subscription = new Subscription();
  private _scrollValue: number = 0;

  @HostBinding('class.visible')
  public visible: boolean = true;

  @HostBinding('class.hidden')
  public get hidden(): boolean {
    return !this.visible;
  };

  @HostBinding('class.hide-on-scroll')
  public hideOnScroll: boolean = true;

  @Input()
  public scrollable?: CdkScrollable;

  constructor(
    app: ApplicationService,
    private readonly _scrollDispatcher: ScrollDispatcher,
    private readonly _zone: NgZone,
    private readonly _changeRef: ChangeDetectorRef

  ) {
    this._subs.add(app.header.hideOnScrollChange.subscribe(v => {
      this.hideOnScroll = v;
      v ? this.enableHeaderScrollHide() : this.disableHeaderScrollHide();
    }));
  }

  ngOnInit() { }

  private enableHeaderScrollHide() {
    this._scrollValue = this.scrollable?.measureScrollOffset('top') ?? 0;
    this._scrollSubs.add(this._scrollDispatcher.scrolled(100).subscribe(_ => {
      this._zone.run(() => {
        const scrollTop = this.scrollable?.measureScrollOffset('top') ?? 0;
        const diff = scrollTop - this._scrollValue;
        if (Math.abs(diff) > 100) {
          if (!this.visible && diff < 0) {
            this.visible = true;
            this._changeRef.markForCheck();
          } else if (this.visible && diff > 0) {
            this.visible = false;
            this._changeRef.markForCheck();
          }
          this._scrollValue = scrollTop;
        }
      });
    }));
  }

  private disableHeaderScrollHide() {
    this.visible = true;
    this._scrollSubs.unsubscribe();
    this._scrollSubs = new Subscription();
    this._changeRef.markForCheck();
  }

  public ngOnDestroy() {
    this.disableHeaderScrollHide();
    this._subs.unsubscribe();
  }

}
