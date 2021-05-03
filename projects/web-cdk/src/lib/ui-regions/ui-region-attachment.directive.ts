import { Directive, ElementRef, Input, Optional, TemplateRef } from '@angular/core';
import { UIRegionAttachmentBaseDirective } from './ui-region-attachment-base.directive';
import { UIRegionService } from './ui-region.service';

@Directive({
  selector: '[cpUseRegion]'
})
export class UIRegionAttachmentDirective extends UIRegionAttachmentBaseDirective {
  private _origin:Node = new Comment();

  @Input()
  public get cpUseRegion(): string | undefined {
    return this.id;
  }
  public set cpUseRegion(val: string | undefined) {
    this.id = val;
  }

  constructor(
    private readonly elementRef: ElementRef<Element>,
    @Optional() private readonly templateRef: TemplateRef<any>,
    regionService: UIRegionService
  ) {
    super(regionService);
    elementRef.nativeElement.parentElement?.insertBefore(this._origin, elementRef.nativeElement);
    elementRef.nativeElement.remove();
  }

  public get element(): Element | undefined {
    return this.elementRef.nativeElement;
  }

  public get origin(): Node | undefined {
    return this._origin;
  }

}
