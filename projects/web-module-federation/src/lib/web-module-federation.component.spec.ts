import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebModuleFederationComponent } from './web-module-federation.component';

describe('WebModuleFederationComponent', () => {
  let component: WebModuleFederationComponent;
  let fixture: ComponentFixture<WebModuleFederationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebModuleFederationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebModuleFederationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
