import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUIAttachment } from './IUIAttachment';
import { UIRegionService } from './ui-region.service';

@Injectable()
export abstract class UIRegionBaseDirective implements IUIAttachment, OnInit, OnDestroy {
  private _id: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    protected readonly regionService: UIRegionService
  ) { }

  public get id(): string | undefined {
    return this._id.value;
  }
  public set id(val: string | undefined) {
    if (this.id !== val) {
      this._id.next(val);
    }
  }

  public get idChange(): Observable<string | undefined> {
    return this._id.asObservable();
  }

  ngOnInit(): void {
    this.regionService.attachmentCreated(this);
  }

  ngOnDestroy(): void {
    this.regionService.attachmentDestroyed(this);
  }

}
