import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersHedingComponent } from './recruiters-heding.component';

describe('RecruitersHedingComponent', () => {
  let component: RecruitersHedingComponent;
  let fixture: ComponentFixture<RecruitersHedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitersHedingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitersHedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
