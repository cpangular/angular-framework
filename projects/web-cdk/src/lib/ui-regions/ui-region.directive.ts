import { Directive, Input, ElementRef } from '@angular/core';
import { UIRegionBaseDirective } from './ui-region-base.directive';
import { UIRegionService } from './ui-region.service';

@Directive({
  selector: '[cpRegion]'
})
export class UIRegionDirective extends UIRegionBaseDirective {
  @Input()
  public get cpRegion(): string | undefined {
    return this.id;
  }
  public set cpRegion(val: string | undefined) {
    this.id = val;
  }

  constructor(
    private readonly elementRef: ElementRef,
    regionService: UIRegionService
  ) {
    super(regionService);
  }

  public get element(): Element | undefined {
    return this.elementRef.nativeElement;
  }


}
