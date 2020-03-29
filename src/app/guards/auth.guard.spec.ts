import { TestBed } from '@angular/core/testing';

import { AngularFireAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AngularFireAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AngularFireAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
