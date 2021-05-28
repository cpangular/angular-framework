import { Subscription } from 'rxjs';
import { UiOutletRef } from './UiOutletRef';
import {
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { UIOutletBaseDirective } from './ui-outlet-base.directive';
import { UiOutletService } from './ui-outlet.service';

//import { UIRegionService } from './ui-region.service';

@Directive({
  selector: '[cpIfUiOutletAttachment]',
})
export class IfUiOutletAttachmentsDirective implements OnInit, OnDestroy {
  private _name?: string;
  private _outletRef?: UiOutletRef;
  private _viewRef?: EmbeddedViewRef<any>;
  private _subs: Subscription = new Subscription();

  @Input('cpIfUiOutletAttachment')
  public get name(): string | undefined {
    return this._name;
  }

  public set name(val: string | undefined) {
    if (this._name !== val) {
      this._name = val;
      this.addListener();
    }
  }

  constructor(
    private readonly _outletService: UiOutletService,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _templateRef: TemplateRef<any>,
    private readonly _changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addListener();
    this.eval();
  }

  ngOnDestroy(): void {
    this.removeListener();
  }

  private addListener() {
    this.removeListener();
    if (this.name) {
      const ref = (this._outletRef = this._outletService.get(this.name));
      this._subs.add(ref.attachmentCreated.subscribe((_) => this.eval()));
      this._subs.add(ref.attachmentDestroyed.subscribe((_) => this.eval()));
    }
  }

  private removeListener() {
    this._subs.unsubscribe();
    this._subs = new Subscription();
  }

  private eval() {
    if (this._outletRef?.attachmentCount && !this._viewRef) {
      this._viewRef = this._viewContainerRef.createEmbeddedView(
        this._templateRef
      );
      this._changeRef.markForCheck();
    } else if (!this._outletRef?.attachmentCount && this._viewRef) {
      this._viewContainerRef.clear();
      this._viewRef = undefined;
      this._changeRef.markForCheck();
    }
  }
}
