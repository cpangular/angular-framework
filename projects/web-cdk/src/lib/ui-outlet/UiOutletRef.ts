import { EventEmitter } from '@angular/core';
import { IUiOutlet } from './IUiOutlet';
import { IUiOutletAttachment } from './IUiOutletAttachment';
import { UiOutletService } from './ui-outlet.service';

export interface IUiOutletRef<TOutlet extends IUiOutlet = IUiOutlet> {
  readonly outlet?: TOutlet;
  readonly attachments: IUiOutletAttachment[];
  readonly attachmentCreated: EventEmitter<IUiOutletAttachment>;
  readonly attachmentDestroyed: EventEmitter<IUiOutletAttachment>;
  readonly attachmentAttached: EventEmitter<IUiOutletAttachment>;
  readonly attachmentDetached: EventEmitter<IUiOutletAttachment>;

  readonly outletCreated: EventEmitter<TOutlet>;
  readonly outletDestroyed: EventEmitter<TOutlet>;
}

export class UiOutletRef<TOutlet extends IUiOutlet = IUiOutlet>
  implements IUiOutletRef<TOutlet>
{
  private _attachments: Set<IUiOutletAttachment> = new Set();

  public readonly attachmentCreated: EventEmitter<IUiOutletAttachment> =
    new EventEmitter();
  public readonly attachmentDestroyed: EventEmitter<IUiOutletAttachment> =
    new EventEmitter();
  public readonly attachmentAttached: EventEmitter<IUiOutletAttachment> =
    new EventEmitter();
  public readonly attachmentDetached: EventEmitter<IUiOutletAttachment> =
    new EventEmitter();

  public readonly outletCreated: EventEmitter<TOutlet> = new EventEmitter();
  public readonly outletDestroyed: EventEmitter<TOutlet> = new EventEmitter();

  private _outlet?: TOutlet;

  public get outlet(): TOutlet | undefined {
    return this._outlet;
  }

  public get attachments(): IUiOutletAttachment[] {
    return Array.from(this._attachments);
  }

  public get attachmentCount(): number {
    return this._attachments.size;
  }

  public constructor(public readonly name: string) {}

  public setOutlet(outlet: TOutlet | undefined) {
    if (this.outlet !== outlet) {
      this._removeOutlet();
      this._addOutlet(outlet);
    }
  }

  private _removeOutlet() {
    if (this.outlet) {
      if (this.attachmentCount) {
        this.attachments.forEach((attachment) => {
          this.outlet?.removeNodes(attachment.nodes);
          this.attachmentDetached.emit(attachment);
        });
      }
      this.outletDestroyed.emit(this.outlet);
    }
  }

  private _addOutlet(outlet: TOutlet | undefined) {
    if (outlet !== undefined) {
      this.outletCreated.emit(outlet);
      if (this.attachmentCount) {
        this.attachments.forEach((attachment) => {
          outlet.addNodes(attachment.nodes);
          this.attachmentAttached.emit(attachment);
        });
      }
    }
    this._outlet = outlet;
  }

  public addAttachment(attachment: IUiOutletAttachment) {
    if (!this._attachments.has(attachment)) {
      this._attachments.add(attachment);
      if (this.outlet) {
        this.outlet.addNodes(attachment.nodes);
        this.attachmentAttached.emit(attachment);
      }
      this.attachmentCreated.emit(attachment);
    }
  }

  public removeAttachment(attachment: IUiOutletAttachment) {
    if (this._attachments.has(attachment)) {
      if (this.outlet) {
        this.outlet.removeNodes(attachment.nodes);
        this.attachmentDetached.emit(attachment);
      }
      this._attachments.delete(attachment);
      this.attachmentDestroyed.emit(attachment);
    }
  }
}
