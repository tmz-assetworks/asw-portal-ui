import { TestBed } from '@angular/core/testing';

import { AddcustomerService } from './addcustomer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddcustomerService', () => {
  let service: AddcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(AddcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
