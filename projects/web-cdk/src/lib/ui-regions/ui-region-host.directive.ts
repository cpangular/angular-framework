import { IUIRegion } from './IUIRegion';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UIRegionHostBaseDirective } from './ui-region-host-base.directive';
import { UIRegionService } from './ui-region.service';

@Directive({
  selector: '[cpRegionHost]'
})
export class UIRegionHostDirective extends UIRegionHostBaseDirective implements OnInit {

  @Input()
  public cpRegionHost?: string;

  constructor(
    private readonly elementRef: ElementRef<Node>,
    regionService: UIRegionService
  ) {
    super(regionService);
  }

  public ngOnInit() {
    this.id = this.cpRegionHost;
    super.ngOnInit();
  }

  public addElement(element: Element): void {
    const elm = this.elementRef.nativeElement;
    if(elm.ELEMENT_NODE === elm.nodeType){
      elm.appendChild(element);
    }else{
      elm.parentElement?.insertBefore(element, elm);
    }
    super.addElement(element);
  }
  public removeElement(element: Element): void {
    super.removeElement(element);
    element.remove();
  }

}
