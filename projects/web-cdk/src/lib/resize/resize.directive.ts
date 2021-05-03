import { ResizeObservable } from 'web-utils';
import { Directive, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[sizeChange]'
})
export class ResizeDirective implements OnDestroy {
  private resizeObservable: ResizeObservable = new ResizeObservable();
  private subs: Subscription = new Subscription();

  @Output()
  public readonly sizeChange: EventEmitter<ResizeObserverEntry> = new EventEmitter();

  constructor(
    private readonly elmRef: ElementRef<HTMLElement>
  ) {
    this.resizeObservable.add(elmRef.nativeElement);
    this.subs.add(this.resizeObservable.subscribe((r:ResizeObserverEntry) => {
      this.sizeChange.emit(r);
    }));
  }
  ngOnDestroy(): void {
    this.resizeObservable.remove(this.elmRef.nativeElement);
    this.subs.unsubscribe();

  }
}
