import { TestBed } from '@angular/core/testing';

import { MaterialThemingService } from './material-theming.service';

describe('MaterialThemingService', () => {
  let service: MaterialThemingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialThemingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
