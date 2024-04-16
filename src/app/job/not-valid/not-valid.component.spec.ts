import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotValidComponent } from './not-valid.component';

describe('NotValidComponent', () => {
  let component: NotValidComponent;
  let fixture: ComponentFixture<NotValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotValidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
