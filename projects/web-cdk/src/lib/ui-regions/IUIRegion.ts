import { EventEmitter } from "@angular/core";

export interface IUIRegion {
  readonly id?: string;
  readonly elementCount: number;
  readonly elementCountChange: EventEmitter<number>;
  readonly elementAdded: EventEmitter<Element>;
  readonly elementRemoved: EventEmitter<Element>;

  addElement(element: Element): void;
  removeElement(element: Element): void;

}
