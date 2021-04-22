import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUIAttachment } from './IUIAttachment';
import { IUIRegion } from './IUIRegion';

@Injectable({
  providedIn: 'root'
})
export class UIRegionService {
  private attachments: Set<IUIAttachment> = new Set();
  private regions: Set<IUIRegion> = new Set();
  private attachmentIdSubs: Map<IUIAttachment, Subscription> = new Map();
  private attachmentRegion: Map<IUIAttachment, IUIRegion> = new Map();

  constructor() { }

  public regionCreated(region: IUIRegion) {
    this.regions.add(region);
    const attachments = Array.from(this.attachments).filter(a => a.id === region.id);
    console.log('Add attachments to new host', attachments)
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
    this.attachmentIdSubs.set(attachment, attachment.idChange.subscribe(_ => {
      this.tryAddAttachmentToRegion(attachment);
    }));
  }

  public attachmentDestroyed(attachment: IUIAttachment) {
    this.attachmentIdSubs.get(attachment)?.unsubscribe();
    this.attachmentIdSubs.delete(attachment);
    this.attachments.delete(attachment);
    this.removeAttachmentFromRegion(attachment);
  }

  public isAttached(attachment: IUIAttachment):boolean{
    return this.attachmentRegion.has(attachment);
  }

  public hasAttachments(region: IUIRegion):boolean{
    return region.elementCount > 0;
  }

  private tryAddAttachmentToRegion(attachment: IUIAttachment) {
    if (this.attachmentRegion.has(attachment)) {
      this.removeAttachmentFromRegion(attachment, this.attachmentRegion.get(attachment));
    }
    const id = attachment.id;
    const region = this.getRegion(id);
    console.log(region, attachment);
    if(region && attachment.element){
      this.attachmentRegion.set(attachment, region);
      region.addElement(attachment.element);
    }
  }

  private getRegion(id: string | undefined): IUIRegion | undefined {
    return Array.from(this.regions).find(r => r.id === id);
  }

  private removeAttachmentFromRegion(attachment: IUIAttachment, region?: IUIRegion) {
    region ??= this.getRegion(attachment.id);
    if(region && attachment.element){
      region.removeElement(attachment.element);
    }
  }

}
