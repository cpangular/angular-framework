import { UiOutletRef, IUiOutletRef } from './UiOutletRef';
import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUiOutlet } from './IUiOutlet';
import { IUiOutletAttachment } from './IUiOutletAttachment';

@Injectable({
  providedIn: 'root',
})
export class UiOutletService {
  private _outletRefs: Map<string, UiOutletRef> = new Map();

  public get(name: string): UiOutletRef {
    if (!this._outletRefs.has(name)) {
      this._outletRefs.set(name, new UiOutletRef(name));
    }
    return this._outletRefs.get(name)!;
  }

  private attachments: Set<IUiOutletAttachment> = new Set();
  private outlets: Set<IUiOutlet> = new Set();
  private outletByName: Map<string, IUiOutlet> = new Map();
  private attachmentByName: Map<string, Set<IUiOutletAttachment>> = new Map();
  private attachmentNameCache: Map<IUiOutletAttachment, string> = new Map();

  private attachmentSubs: Map<IUiOutletAttachment, Subscription> = new Map();
  private attachmentOutletLookup: Map<IUiOutletAttachment, IUiOutlet> =
    new Map();

  public outletCreated(outlet: IUiOutlet): IUiOutletRef {
    const ref = this.get(outlet.name);
    ref.setOutlet(outlet);
    return ref;
    //// old
    /*
    this.outlets.add(outlet);
    this.outletByName.set(outlet.name, outlet);
    const attachments = Array.from(this.attachments).filter(a => a.name === outlet.name);
    for (const attachment of attachments) {
      this.tryAddAttachmentToOutlet(attachment);
    }
    */
  }

  public outletDestroyed(outlet: IUiOutlet): IUiOutletRef {
    const ref = this.get(outlet.name);
    ref.setOutlet(undefined);
    return ref;
    /*
    //// old
    this.outlets.delete(outlet);
    this.outletByName.delete(outlet.name);
    const attachments = Array.from(this.attachments).filter(a => a.name === outlet.name);
    for (const attachment of attachments) {
      this.removeAttachmentFromOutlet(attachment);
    }
    */
  }

  public attachmentCreated(attachment: IUiOutletAttachment) {
    const ref = this.get(attachment.name!);
    ref.addAttachment(attachment);
    /*
    //// old
    this.attachments.add(attachment);
    if (this.attachmentSubs.has(attachment)) {
      this.attachmentSubs.get(attachment)?.unsubscribe();
    }
    const sub = new Subscription();
    sub.add(attachment.nameChange.subscribe(name => {
      this.removeAttachByName(attachment);
      if (name) {
        this.addAttachByName(attachment);
        this.tryAddAttachmentToOutlet(attachment);
      }
    }));
    sub.add(attachment.inlineFallbackChange.subscribe(_ => {
      this.tryAddAttachmentToOutlet(attachment);
    }));
    this.attachmentSubs.set(attachment, sub);
    */
  }
  /*
  private addAttachByName(attachment: IUiOutletAttachment) {
    if (attachment.name) {
      if (!this.attachmentByName.has(attachment.name)) {
        this.attachmentByName.set(attachment.name, new Set());
      }
      this.attachmentByName.get(attachment.name)?.add(attachment);
    }
  }

  private removeAttachByName(attachment: IUiOutletAttachment) {
    if (this.attachmentNameCache.has(attachment)) {
      const oldName = this.attachmentNameCache.get(attachment)!;
      const attachments = this.attachmentByName.get(oldName);
      attachments?.delete(attachment);
      this.attachmentNameCache.delete(attachment);
    }
  }
*/
  public attachmentDestroyed(attachment: IUiOutletAttachment) {
    const ref = this.get(attachment.name!);
    ref.removeAttachment(attachment);
    /*
    //// old
    this.removeAttachByName(attachment);
    this.attachmentSubs.get(attachment)?.unsubscribe();
    this.attachmentSubs.delete(attachment);
    this.attachments.delete(attachment);
    this.removeAttachmentFromOutlet(attachment);
    */
  }
  /*
  public isAttached(attachment: IUiOutletAttachment): boolean {
    return this.attachmentOutletLookup.has(attachment);
  }

  public hasAttachments(outletOrName: IUiOutlet | string): boolean {
    const name = typeof outletOrName === 'string' ? outletOrName : outletOrName.name;
    return (this.attachmentByName.get(name)?.size ?? 0) > 0;
  }



  private tryAddAttachmentToOutlet(attachment: IUiOutletAttachment) {
    if (this.attachmentOutletLookup.has(attachment)) {
      this.removeAttachmentFromOutlet(attachment, this.attachmentOutletLookup.get(attachment));
    }
    const outlet = this.resolveAttachmentOutlet(attachment);
    if (outlet && attachment.nodes) {
      this.attachmentOutletLookup.set(attachment, outlet);
      attachment.onBeforeAdded(outlet);
      outlet.addNodes(attachment.nodes);
      attachment.onAdded(outlet);
      this.updateLookups();
    }
  }

  private resolveAttachmentOutlet(attachment: IUiOutletAttachment): IUiOutlet | undefined {
    let outlet = this.getOutletByName(attachment.name);
    if (!outlet && attachment.inlineFallback) {
      outlet = new InPlaceOutlet(attachment);
    }
    return outlet;
  }
*/
  private updateLookups() {
    /*this.attachmentByName = new Map();
    for (const att of this.attachments) {
      const name = att.name!;
      if (!this.attachmentByName.has(name)) {
        this.attachmentByName.set(name, new Set());
      }
      this.attachmentByName.get(name)?.add(att);
    }
    */
  }

  public getOutletByName(name: string | undefined): IUiOutlet | undefined {
    return Array.from(this.outlets).find((o) => o.name === name);
  }

  public getAttachmentsByName(name: string): IUiOutletAttachment[] {
    if (this.attachmentByName.has(name)) {
      return Array.from(this.attachmentByName.get(name)!);
    }
    return [];
  }
}
/*
  private removeAttachmentFromOutlet(attachment: IUiOutletAttachment, outlet?: IUiOutlet) {
    outlet ??= this.getOutletByName(attachment.name);
    if (outlet && attachment.nodes) {
      attachment.onBeforeRemoved(outlet);
      outlet.removeNodes(attachment.nodes);
      attachment.onRemoved(outlet);
      this.updateLookups();
    }
  }

}
*/
/*
class InPlaceOutlet implements IUiOutlet {
  private static __c = 0;
  public name: string;
  public elementCount: number = 0;
  private nodes?: Node[];
  constructor(
    private readonly attachment: IUiOutletAttachment
  ) {
    this.name = `--in-place-outlet-${InPlaceOutlet.__c++}--`;
  }

  public countChange: EventEmitter<number> = new EventEmitter();
  public added: EventEmitter<Node[]> = new EventEmitter();
  public removed: EventEmitter<Node[]> = new EventEmitter();

  addNodes(nodes: Node[]): void {
    this.nodes = nodes;
    for (const node of nodes) {
     // this.attachment.origin?.parentElement?.insertBefore(node, this.attachment.origin);
    }
    this.elementCount = 1;
    this.countChange.emit(1);
    this.added.emit(nodes);
  }

  removeNodes(nodes: Node[]): void {
    for (const node of nodes) {
      node.parentElement?.removeChild(node);
    }
    this.nodes = undefined;
    this.elementCount = 0;
    this.countChange.emit(0);
    this.removed.emit(nodes);
  }

  clearNodes(): void {
    if (this.nodes) {
      this.removeNodes(this.nodes);
    }
  }
}
*/
