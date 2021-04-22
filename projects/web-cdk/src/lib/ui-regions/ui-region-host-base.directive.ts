import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { IUIRegion } from './IUIRegion';
import { UIRegionService } from './ui-region.service';

@Injectable()
export abstract class UIRegionHostBaseDirective implements IUIRegion, OnInit, OnDestroy {
  private attachments: Set<Element> = new Set();
  public id?: string;


  constructor(
    protected readonly regionService: UIRegionService
  ) { }

  public addElement(element: Element): void {
    this.attachments.add(element);
  }

  public removeElement(element: Element): void {
    this.attachments.delete(element);
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
