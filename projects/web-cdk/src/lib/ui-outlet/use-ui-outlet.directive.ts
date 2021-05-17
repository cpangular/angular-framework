import { UiOutletService } from './ui-outlet.service';
import { Directive, ElementRef, EmbeddedViewRef, Input, Optional, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { UiOutletAttachmentBaseDirective } from './ui-outlet-attachment-base.directive';

@Directive({
  selector: '[cpUseUiOutlet]',
  inputs: [
    "name:cpUseUiOutlet"
    //"disabled:cpUseUiOutletDisable"
  ]
})
export class UseUiOutletDirective extends UiOutletAttachmentBaseDirective {
  private _viewRef: EmbeddedViewRef<any>;
  private _nodes: Node[] = [];

  constructor(
    outletService: UiOutletService,
    viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<any>,
  ) {
    super(outletService);
    this._viewRef = viewContainerRef.createEmbeddedView(templateRef);
    this._nodes = this._viewRef.rootNodes;
    this.nodes.forEach(n => this.removeNode(n));
  }

  public get nodes(): Node[] {
    return this._nodes;
  }

  private removeNode(node: Node): void {
    node.parentElement?.removeChild(node);
  }

  /*
  private _origin: Node = new Comment();
  private _view?: EmbeddedViewRef<any>;
  private _nodes: Node[];

  @Input()
  public get cpUseUiOutlet(): string | undefined {
    return this.name;
  }
  public set cpUseUiOutlet(val: string | undefined) {
    this.name = val;
  }

  constructor(
    elementRef: ElementRef<Element>,
    viewContainerRef: ViewContainerRef,
    @Optional() templateRef: TemplateRef<any>,
    outletService: UiOutletService
  ) {
    super(outletService);
    if (templateRef) {
      this._origin = elementRef.nativeElement;
      this._view = viewContainerRef.createEmbeddedView(templateRef);
      this._nodes = this._view.rootNodes;
     // this.inlineFallback = false;
    } else {
      this._nodes = [elementRef.nativeElement];
      elementRef.nativeElement.parentElement?.insertBefore(this._origin, elementRef.nativeElement);
      elementRef.nativeElement.remove();
     // this.inlineFallback = true;
    }
    for (const node of this._nodes) {
      node.parentElement?.removeChild(node);
    }
  }

  public get nodes(): Node[] | undefined {
    return this._nodes;
  }

  public get origin(): Node | undefined {
    return this._origin;
  }*/
}
