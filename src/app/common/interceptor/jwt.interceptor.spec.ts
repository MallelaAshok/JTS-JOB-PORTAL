import { TestBed } from '@angular/core/testing';
import { jwtInterceptor } from './jwt.interceptor';

describe('CustomeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      jwtInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: jwtInterceptor = TestBed.inject(jwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

