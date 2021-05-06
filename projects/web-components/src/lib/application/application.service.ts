import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationHeaderController, IApplicationHeaderController } from './application-header/ApplicationHeaderController';
import { ApplicationPanelController, IApplicationPanelController } from './application-panel/ApplicationPanelController';



class ApplicationProperty<T>{
  protected _change: BehaviorSubject<T>;

  constructor(startValue: T) {
    this._change = new BehaviorSubject(startValue);
  }

  public get valueChange(): Observable<T> {
    return this._change.asObservable();
  }

  public get value(): T {
    return this._change.value;
  }

  public set value(val: T) {
    if (this.value !== val) {
      this._change.next(val);
    }
  }
}

class ApplicationTitle extends ApplicationProperty<string>{
  constructor() {
    super('');
    this.valueChange.subscribe(title => {
      document.title = title;
    });
   }
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public readonly title: ApplicationTitle = new ApplicationTitle();
  public readonly header: IApplicationHeaderController = new ApplicationHeaderController();
  public readonly leftPanel: IApplicationPanelController = new ApplicationPanelController();
  public readonly rightPanel: IApplicationPanelController = new ApplicationPanelController();
  public readonly topPanel: IApplicationPanelController = new ApplicationPanelController();
  public readonly bottomPanel: IApplicationPanelController = new ApplicationPanelController();

  constructor() { }





}
