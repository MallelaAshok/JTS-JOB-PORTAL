import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansMembershipComponent } from './plans-membership.component';

describe('PlansMembershipComponent', () => {
  let component: PlansMembershipComponent;
  let fixture: ComponentFixture<PlansMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansMembershipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlansMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
