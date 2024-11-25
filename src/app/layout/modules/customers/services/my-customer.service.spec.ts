import { TestBed } from '@angular/core/testing';

import { MyCustomerService } from './my-customer.service';

describe('MyCustomerService', () => {
  let service: MyCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
