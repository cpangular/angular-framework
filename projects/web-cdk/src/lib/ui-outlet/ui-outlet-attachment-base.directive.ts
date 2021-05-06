import { UiOutletService } from './ui-outlet.service';
import { IUiOutletAttachment } from './IUiOutletAttachment';
import { Directive, Input, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUiOutlet } from './IUiOutlet';



@Directive()
export abstract class UiOutletAttachmentBaseDirective implements IUiOutletAttachment, OnInit, OnDestroy {
  private _name: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private _inlineFallback: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public abstract origin?: Node | undefined;
  public abstract nodes?: Node[];

  public readonly preAdd: EventEmitter<IUiOutlet> = new EventEmitter();
  public readonly postAdd: EventEmitter<IUiOutlet> = new EventEmitter();

  public readonly preRemove: EventEmitter<IUiOutlet> = new EventEmitter();
  public readonly postRemove: EventEmitter<IUiOutlet> = new EventEmitter();

  constructor(
    protected readonly outletService: UiOutletService
  ) { }


  public get name(): string | undefined {
    return this._name.value;
  }

  public set name(val: string | undefined) {
    if (this.name !== val) {
      this._name.next(val);
    }
  }

  public get nameChange(): Observable<string | undefined> {
    return this._name.asObservable();
  }

  public get inlineFallback(): boolean {
    return this._inlineFallback.value;
  }

  public set inlineFallback(val: boolean) {
    if (this.inlineFallback !== val) {
      this._inlineFallback.next(val);
    }
  }

  public get inlineFallbackChange(): Observable<boolean> {
    return this._inlineFallback.asObservable();
  }

  ngOnInit(): void {
    this.outletService.attachmentCreated(this);
  }

  ngOnDestroy(): void {
    this.outletService.attachmentDestroyed(this);
  }

  onAdded(outlet: IUiOutlet): void {
    this.postAdd.emit(outlet);
  }

  onRemoved(outlet: IUiOutlet): void {
    this.postRemove.emit(outlet);
  }

  onBeforeAdded(outlet: IUiOutlet): void {
    this.preAdd.emit(outlet);
  }

  onBeforeRemoved(outlet: IUiOutlet): void {
    this.preRemove.emit(outlet);
  }
}
