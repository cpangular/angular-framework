import { IUiOutletRef, UiOutletRef } from './UiOutletRef';
import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IUiOutlet } from './IUiOutlet';
import { UiOutletService } from './ui-outlet.service';

@Directive()
export abstract class UIOutletBaseDirective
  implements IUiOutlet, OnInit, OnDestroy
{
  private _ref!: UiOutletRef;

  public abstract name: string;
  private elements: Set<Node[]> = new Set();

  @Output()
  public added: EventEmitter<Node[]> = new EventEmitter();
  @Output()
  public removed: EventEmitter<Node[]> = new EventEmitter();
  @Output()
  public countChange: EventEmitter<number> = new EventEmitter();

  constructor(
    protected readonly outletService: UiOutletService,
    protected readonly elementRef: ElementRef<Comment>
  ) {}

  public addNodes(nodes: Node[]): void {
    this.elements.add(nodes);
    this.countChange.emit(this.elements.size);
    this.added.emit(nodes);
  }

  public removeNodes(nodes: Node[]): void {
    this.elements.delete(nodes);
    this.countChange.emit(this.elements.size);
    this.removed.emit(nodes);
  }

  public clearNodes(): void {
    this.elements.forEach((n) => this.removeNodes(n));
  }

  public get elementCount(): number {
    return this.elements.size;
  }

  ngOnInit(): void {
    this._ref = this.outletService.get(this.name);
    this._ref.setOutlet(this);
  }

  ngOnDestroy(): void {
    this.clearNodes();
    this._ref.setOutlet(undefined);
  }
}
