import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUIRegion } from './IUIRegion';
import { UIRegionService } from './ui-region.service';

@Directive()
export abstract class UIRegionBaseDirective implements IUIRegion, OnInit, OnDestroy {
  private attachments: Set<Element> = new Set();
  public id?: string;

  @Output()
  public elementAdded: EventEmitter<Element> = new EventEmitter();
  @Output()
  public elementRemoved: EventEmitter<Element> = new EventEmitter();
  @Output()
  public elementCountChange: EventEmitter<number> = new EventEmitter();

  constructor(
    protected readonly regionService: UIRegionService
  ) { }

  public addElement(element: Element): void {
    this.attachments.add(element);
    this.elementCountChange.emit(this.attachments.size);
    this.elementAdded.emit(element);
  }

  public removeElement(element: Element): void {
    this.attachments.delete(element);
    this.elementCountChange.emit(this.attachments.size);
    this.elementRemoved.emit(element);
  }

  public get elementCount(): number {
    return this.attachments.size;
  }

  ngOnInit(): void {
    this.regionService.regionCreated(this);

  }
  ngOnDestroy(): void {
    this.regionService.regionDestroyed(this);
  }


}
