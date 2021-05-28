import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ElementRef,
} from '@angular/core';
import { openVerticalAnimation } from './tray.animations';

export type TrayAnchorPoint = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'cp-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss'],
  animations: [openVerticalAnimation],
})
export class TrayComponent {
  @HostBinding('class.tray')
  private cssClass = true;

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
      const div = this.elmRef.nativeElement.querySelector(
        ':scope > div'
      ) as HTMLDivElement;
      div.style.display = 'block';
      this.changeRef.markForCheck();
    }
  }

  @HostBinding('class.closed')
  private get closed(): boolean {
    return !this._opened;
  }

  @HostBinding('@openClose')
  private get openClose() {
    const div = this.elmRef.nativeElement.querySelector(
      ':scope > div'
    ) as HTMLDivElement;
    let value = '';
    let size = '0';

    switch (this.anchor) {
      case 'bottom':
      case 'top':
        this.elmRef.nativeElement.style.height = 'auto';
        this.elmRef.nativeElement.style.width = '';
        value = this._opened ? 'openV' : 'closeV';
        size = div.offsetHeight + 'px';
        if (!this._opened) {
          this.elmRef.nativeElement.style.height = '0';
        }
        break;
      default:
        this.elmRef.nativeElement.style.width = 'auto';
        this.elmRef.nativeElement.style.height = '';
        value = this._opened ? 'openH' : 'closeH';
        size = div.offsetWidth + 'px';
        if (!this._opened) {
          this.elmRef.nativeElement.style.width = '0';
        }
        break;
    }
    return {
      value,
      params: {
        size,
      },
    };
  }

  @HostListener('@openClose.start', ['$event'])
  protected onOpenCloseStart(event: AnimationEvent) {
    if (event.fromState == 'opened') {
      this.elmRef.nativeElement.classList.add('closing');
    } else {
      this.elmRef.nativeElement.classList.add('opening');
    }
    const div = this.elmRef.nativeElement.querySelector(
      ':scope > div'
    ) as HTMLDivElement;
    div.style.width = div.offsetWidth + 'px';
    div.style.height = div.offsetHeight + 'px';
  }

  @HostListener('@openClose.done', ['$event'])
  protected onOpenCloseDone(event: AnimationEvent) {
    this.elmRef.nativeElement.classList.remove('opening');
    this.elmRef.nativeElement.classList.remove('closing');
    const div = this.elmRef.nativeElement.querySelector(
      ':scope > div'
    ) as HTMLDivElement;
    div.style.width = '';
    div.style.height = '';
    if (event.toState == 'closed') {
      const div = this.elmRef.nativeElement.querySelector(
        ':scope > div'
      ) as HTMLDivElement;
      div.style.display = 'none';
    }
  }

  constructor(
    private readonly changeRef: ChangeDetectorRef,
    private readonly elmRef: ElementRef<HTMLElement>
  ) {}
}
