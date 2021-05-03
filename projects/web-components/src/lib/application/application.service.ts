import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


class AppPanelController {
  private _openChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get openedChange(): Observable<boolean> {
    return this._openChange.asObservable();
  }

  public get opened(): boolean {
    return this._openChange.value;
  }

  public set opened(val: boolean) {
    if (this.opened !== val) {
      this._openChange.next(val);
    }
  }
}

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

  public readonly leftPanel: AppPanelController = new AppPanelController();
  public readonly rightPanel: AppPanelController = new AppPanelController();

  constructor() { }





}
