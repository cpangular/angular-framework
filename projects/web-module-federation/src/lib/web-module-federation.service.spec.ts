import { TestBed } from '@angular/core/testing';

import { WebModuleFederationService } from './web-module-federation.service';

describe('WebModuleFederationService', () => {
  let service: WebModuleFederationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebModuleFederationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
