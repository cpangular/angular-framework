export interface IUIRegion {
  readonly id?: string;
  readonly elementCount: number;
  addElement(element: Element): void;
  removeElement(element: Element): void;
}
