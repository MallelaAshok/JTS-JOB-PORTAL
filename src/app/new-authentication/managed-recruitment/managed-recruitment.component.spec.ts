import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedRecruitmentComponent } from './managed-recruitment.component';

describe('ManagedRecruitmentComponent', () => {
  let component: ManagedRecruitmentComponent;
  let fixture: ComponentFixture<ManagedRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagedRecruitmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagedRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
