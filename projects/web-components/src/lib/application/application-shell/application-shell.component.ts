import { Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationLayoutComponent } from '../../application-layout/application-layout.component';
import { IApplicationLayoutComponent } from '../application-layout/IApplicationLayoutComponent';
import { ApplicationService } from '../application.service';
import { ApplicationLayoutOptions } from './application-layout-options';

@Component({
  selector: 'cp-application-shell',
  templateUrl: './application-shell.component.html',
  styleUrls: ['./application-shell.component.scss']
})
export class ApplicationShellComponent implements OnInit, OnChanges {
  private _subs: Subscription = new Subscription();
  private _applicationLayout?: Type<any>;
  private _applicationLayoutOptions?: ApplicationLayoutOptions;
  private _applicationLayoutRef?: ComponentRef<IApplicationLayoutComponent>;

  @ViewChild('layoutRef', { static: true, read: ViewContainerRef })
  private layoutRef!: ViewContainerRef

  @Input()
  public get applicationLayout(): Type<any> {
    return this._applicationLayout ?? ApplicationLayoutComponent;
  }
  public set applicationLayout(val: Type<any>) {
    this._applicationLayout = val;
  }

  @Input()
  public get applicationLayoutOptions(): ApplicationLayoutOptions | undefined {
    return this._applicationLayoutOptions;
  }

  public set applicationLayoutOptions(val: ApplicationLayoutOptions | undefined) {
    this._applicationLayoutOptions = val;
  }

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appService: ApplicationService
  ) {

  }

  ngOnInit() {
    this.createLayout();
    this.applyLayoutOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.applicationLayout && !changes.applicationLayout.isFirstChange()) {
      this.createLayout();
    }
    if (changes.applicationLayoutOptions && !changes.applicationLayoutOptions.isFirstChange()) {
      this.applyLayoutOptions();
    }
  }

  private createLayout() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.applicationLayout);
    this.layoutRef.clear();
    this._applicationLayoutRef = this.layoutRef.createComponent(componentFactory);
  }

  private applyLayoutOptions() {
    this.applicationLayoutOptions ??= {
      hideHeaderOnScroll: true
    };
    for (const key in this.applicationLayoutOptions) {
      if (Object.prototype.hasOwnProperty.call(this.applicationLayoutOptions, key)) {
        const val = (this.applicationLayoutOptions as any)[key];
        (this._applicationLayoutRef!.instance as any)[key] = val;
      }
    }
  }
}
