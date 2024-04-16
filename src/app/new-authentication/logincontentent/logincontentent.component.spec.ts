import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincontententComponent } from './logincontentent.component';

describe('LogincontententComponent', () => {
  let component: LogincontententComponent;
  let fixture: ComponentFixture<LogincontententComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogincontententComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogincontententComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
