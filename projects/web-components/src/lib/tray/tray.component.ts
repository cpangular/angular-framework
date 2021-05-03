import { AnimationEvent } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ElementRef } from '@angular/core';
import { openVerticalAnimation } from './tray.animations';



export type TrayAnchorPoint = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'cp-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss'],
  animations: [
    openVerticalAnimation
  ]
})
export class TrayComponent implements OnInit {
  private _opened: boolean = false;

  @Input()
  public anchor: TrayAnchorPoint = 'bottom';

  @HostBinding('attr.anchor')
  private get anchorAttr(): string {
    return this.anchor;
  }

  @Output()
  public openedChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  @HostBinding('class.opened')
  public get opened(): boolean {
    return this._opened;
  }

  public set opened(val: boolean) {
    if (this._opened !== val) {
      this._opened = val;
      const div = this.elmRef.nativeElement.querySelector(':scope > div') as HTMLDivElement;
      div.style.display = 'block';
      this.changeRef.markForCheck();
    }
  }

  @HostBinding('class.closed')
  private get closed(): boolean {
    return !this._opened;
  }

  @HostBinding('@openClose')
  private get state(): string {
    switch (this.anchor) {
      case 'bottom':
      case 'top':
        return this._opened ? 'openV' : 'closeV';
      default:
        return this._opened ? 'openH' : 'closeH';
    }
  }



  @HostListener('@openClose.start', ['$event'])
  private onOpenCloseStart(event: AnimationEvent) {
    if (event.fromState == 'opened') {
      this.elmRef.nativeElement.classList.add('closing');
    } else {
      this.elmRef.nativeElement.classList.add('opening');
    }
  }

  @HostListener('@openClose.done', ['$event'])
  private onOpenCloseDone(event: AnimationEvent) {
    this.elmRef.nativeElement.classList.remove('opening');
    this.elmRef.nativeElement.classList.remove('closing');
    if (event.toState == 'closed') {
      const div = this.elmRef.nativeElement.querySelector(':scope > div') as HTMLDivElement;
      div.style.display = 'none';
    }
  }

  constructor(
    private readonly changeRef: ChangeDetectorRef,
    private readonly elmRef: ElementRef<HTMLElement>,
  ) {

  }

  ngOnInit() {
  }

}
