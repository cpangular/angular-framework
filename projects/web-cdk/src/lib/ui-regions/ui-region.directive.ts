import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { UIRegionBaseDirective } from './ui-region-base.directive';
import { UIRegionService } from './ui-region.service';

@Directive({
  selector: '[cpRegion]'
})
export class UIRegionDirective extends UIRegionBaseDirective implements OnInit {

  @Input()
  @HostBinding('attr.cpRegion')
  public cpRegion?: string;

  constructor(
    private readonly elementRef: ElementRef<Node>,
    regionService: UIRegionService
  ) {
    super(regionService);
  }

  public ngOnInit() {
    this.id = this.cpRegion;
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
