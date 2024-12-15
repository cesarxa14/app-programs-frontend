import { TestBed } from '@angular/core/testing';

import { RegisterBookGuard } from './register-book.guard';

describe('RegisterBookGuard', () => {
  let guard: RegisterBookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisterBookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
