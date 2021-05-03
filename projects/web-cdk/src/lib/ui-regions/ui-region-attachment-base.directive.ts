import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUIAttachment } from './IUIAttachment';
import { UIRegionService } from './ui-region.service';

@Directive()
export abstract class UIRegionAttachmentBaseDirective implements IUIAttachment, OnInit, OnDestroy {
  private _id: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private _inlineOnMissingRegion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public abstract element?: Element;

  constructor(
    protected readonly regionService: UIRegionService
  ) { }

  public get id(): string | undefined {
    return this._id.value;
  }

  public set id(val: string | undefined) {
    if (this.id !== val) {
      this._id.next(val);
    }
  }

  public get idChange(): Observable<string | undefined> {
    return this._id.asObservable();
  }

  @Input()
  public get inlineOnMissingRegion(): boolean {
    return this._inlineOnMissingRegion.value;
  }

  public set inlineOnMissingRegion(val: boolean) {
    if (this.inlineOnMissingRegion !== val) {
      this._inlineOnMissingRegion.next(val);
    }
  }

  public get inlineOnMissingRegionChange(): Observable<boolean> {
    return this._inlineOnMissingRegion.asObservable();
  }


  ngOnInit(): void {
    this.regionService.attachmentCreated(this);
  }

  ngOnDestroy(): void {
    this.regionService.attachmentDestroyed(this);
  }

}
