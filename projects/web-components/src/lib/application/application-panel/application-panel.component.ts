import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationLayoutOutlets } from '../application-layout/ApplicationLayoutOutlets';
import { ApplicationPanelController, IApplicationPanelController } from './ApplicationPanelController';

@Component({
  selector: 'cp-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationPanelComponent implements OnDestroy {
  public LayoutOutlet = ApplicationLayoutOutlets;
  @HostBinding('class.application-panel')
  private cssClass = true;

  private _controllerSubs: Subscription = new Subscription();
  private _controller: ApplicationPanelController = new ApplicationPanelController(this.zone);

  @Input()
  public get controller(): IApplicationPanelController {
    return this._controller;
  }
  public set controller(val: IApplicationPanelController) {
    if (this._controller !== val) {
      this._controller = val as ApplicationPanelController;
      this._controllerSubs.unsubscribe();
      this._controllerSubs = new Subscription();
      this._controller.appPanelComponent = this;
      const openObs = this._controller.isOpenChange;
      this._controllerSubs.add(openObs.subscribe(_ => this.changeRef.markForCheck()))
    }
  }

  @Input()
  public anchor: 'top' | 'left' | 'bottom' | 'right' = 'top';


  public get isOpen(): boolean {
    return this._controller.isOpen;
  }

  public get anchorOpposite(): 'top' | 'left' | 'bottom' | 'right' {
    switch (this.anchor) {
      case 'bottom':
        return 'top';
      case 'top':
        return 'bottom';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  }



  @Input()
  @HostBinding('class.inline')
  public inline: boolean = true;

  constructor(
    private readonly changeRef: ChangeDetectorRef,
    private readonly zone: NgZone
  ) { }


  ngOnDestroy(): void {
    this._controllerSubs.unsubscribe();
  }

  trayCountChanged(count: number) {
    this._controller.elementCount = count;
  }
}
