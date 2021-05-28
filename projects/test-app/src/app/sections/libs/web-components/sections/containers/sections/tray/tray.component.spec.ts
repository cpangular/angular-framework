/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrayComponent } from './tray.component';

describe('TrayComponent', () => {
  let component: TrayComponent;
  let fixture: ComponentFixture<TrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
