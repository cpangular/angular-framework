import { EventEmitter } from "@angular/core";

export interface IUiOutlet {
  readonly name: string;
  readonly elementCount: number;
  readonly countChange: EventEmitter<number>;
  readonly added: EventEmitter<Node[]>;
  readonly removed: EventEmitter<Node[]>;

  addNodes(nodes: Node[]): void;
  removeNodes(nodes: Node[]): void;
  clearNodes(): void;
}
