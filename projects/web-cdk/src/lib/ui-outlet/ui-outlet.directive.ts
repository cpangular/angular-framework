import { Directive, ElementRef, Input } from '@angular/core';
import { UIOutletBaseDirective } from './ui-outlet-base.directive';
import { UiOutletService } from './ui-outlet.service';

//import { UIRegionService } from './ui-region.service';

@Directive({
  selector: 'ng-container[cpUiOutlet]'
})
export class UiOutletDirective extends UIOutletBaseDirective {

  @Input('cpUiOutlet')
  public name!: string;


  constructor(
    outletService: UiOutletService,
    elementRef: ElementRef<Comment>
  ) {
    super(outletService, elementRef);
  }

  public addNodes(nodes: Node[]): void {
    const elm = this.elementRef.nativeElement;
    for (const node of nodes) {
      elm.parentElement?.insertBefore(node, elm);
    }
    super.addNodes(nodes);
  }

  public removeNodes(nodes: Node[]): void {
    super.removeNodes(nodes);
    for (const node of nodes) {
      node.parentElement?.removeChild(node);
    }
  }

}
