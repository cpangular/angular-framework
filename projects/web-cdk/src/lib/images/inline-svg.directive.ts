import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'svg[src]',
})
export class InlineSvgDirective implements OnChanges {
  private _currentElement: SVGElement;

  @Input()
  public src?: string;

  constructor(private readonly elementRef: ElementRef<SVGElement>) {
    this._currentElement = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      if (!this.src) {
        this.unload();
      } else {
        this.load();
      }
    }
  }

  private async load() {
    const div = document.createElement('div');
    div.innerHTML = await (await fetch(this.src!)).text();
    const svg = div.firstElementChild! as SVGElement;
    const attrs = this.elementRef.nativeElement.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs.item(i)!;
      switch (attr.name.toLowerCase()) {
        case 'src':
          break;
        default:
          svg.setAttribute(attr.name, attr.value);
          break;
      }
    }
    this._currentElement.after(svg);
    this._currentElement.remove();
    this._currentElement = svg;
  }

  private unload() {
    if (this._currentElement !== this.elementRef.nativeElement) {
      this._currentElement.after(this.elementRef.nativeElement);
      this._currentElement.remove();
      this._currentElement = this.elementRef.nativeElement;
    }
  }
}
