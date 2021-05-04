import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialThemingComponent } from './material-theming.component';

describe('MaterialThemingComponent', () => {
  let component: MaterialThemingComponent;
  let fixture: ComponentFixture<MaterialThemingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialThemingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialThemingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
