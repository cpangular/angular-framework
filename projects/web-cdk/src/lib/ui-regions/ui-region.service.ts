import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUIAttachment } from './IUIAttachment';
import { IUIRegion } from './IUIRegion';

class InPlaceRegion implements IUIRegion {
  id?: string | undefined;
  elementCount: number = 0;
  constructor(
    private readonly attachment: IUIAttachment
  ) { }
  elementCountChange: EventEmitter<number> = new EventEmitter();
  elementAdded: EventEmitter<Element> = new EventEmitter();
  elementRemoved: EventEmitter<Element> = new EventEmitter();

  addElement(element: Element): void {
    this.attachment.origin?.parentElement?.insertBefore(element, this.attachment.origin);
    this.elementCount = 1;
    this.elementCountChange.emit(1);
    this.elementAdded.emit(element);
  }

  removeElement(element: Element): void {
    element.remove();
    this.elementCount = 0;
    this.elementCountChange.emit(0);
    this.elementRemoved.emit(element);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UIRegionService {
  private attachments: Set<IUIAttachment> = new Set();
  private regions: Set<IUIRegion> = new Set();
  private attachmentSubs: Map<IUIAttachment, Subscription> = new Map();
  private attachmentRegion: Map<IUIAttachment, IUIRegion> = new Map();

  constructor() {}

  public regionCreated(region: IUIRegion) {
    this.regions.add(region);
    const attachments = Array.from(this.attachments).filter(a => a.id === region.id);
    for (const attachment of attachments) {
      this.tryAddAttachmentToRegion(attachment);
    }
  }

  public regionDestroyed(region: IUIRegion) {
    this.regions.delete(region);
    const attachments = Array.from(this.attachments).filter(a => a.id === region.id);
    for (const attachment of attachments) {
      this.removeAttachmentFromRegion(attachment);
    }
  }

  public attachmentCreated(attachment: IUIAttachment) {
    this.attachments.add(attachment);
    if (this.attachmentSubs.has(attachment)) {
      this.attachmentSubs.get(attachment)?.unsubscribe();
    }
    const sub = new Subscription();
    sub.add(attachment.idChange.subscribe(_ => {
      this.tryAddAttachmentToRegion(attachment);
    }));
    sub.add(attachment.inlineOnMissingRegionChange.subscribe(_ => {
      this.tryAddAttachmentToRegion(attachment);
    }));
    this.attachmentSubs.set(attachment, sub);
  }

  public attachmentDestroyed(attachment: IUIAttachment) {
    this.attachmentSubs.get(attachment)?.unsubscribe();
    this.attachmentSubs.delete(attachment);
    this.attachments.delete(attachment);
    this.removeAttachmentFromRegion(attachment);
  }

  public isAttached(attachment: IUIAttachment): boolean {
    return this.attachmentRegion.has(attachment);
  }

  public hasAttachments(region: IUIRegion): boolean {
    return region.elementCount > 0;
  }

  private tryAddAttachmentToRegion(attachment: IUIAttachment) {
    if (this.attachmentRegion.has(attachment)) {
      this.removeAttachmentFromRegion(attachment, this.attachmentRegion.get(attachment));
    }
    const region = this.resolveAttachmentRegion(attachment);
    if (region && attachment.element) {
      this.attachmentRegion.set(attachment, region);
      attachment.onBeforeAdded(region);
      region.addElement(attachment.element);
      attachment.onAdded(region);
    }
  }

  private resolveAttachmentRegion(attachment: IUIAttachment): IUIRegion | undefined {
    let region = this.getRegion(attachment.id);
    if(!region && attachment.inlineOnMissingRegion){
      region = new InPlaceRegion(attachment);
    }
    return region;
  }

  private getRegion(id: string | undefined): IUIRegion | undefined {
    return Array.from(this.regions).find(r => r.id === id);
  }

  private removeAttachmentFromRegion(attachment: IUIAttachment, region?: IUIRegion) {
    region ??= this.getRegion(attachment.id);
    if (region && attachment.element) {
      attachment.onBeforeRemoved(region);
      region.removeElement(attachment.element);
      attachment.onRemoved(region);
    }
  }

}
