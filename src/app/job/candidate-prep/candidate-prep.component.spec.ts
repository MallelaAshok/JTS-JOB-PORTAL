import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePrepComponent } from './candidate-prep.component';

describe('CandidatePrepComponent', () => {
  let component: CandidatePrepComponent;
  let fixture: ComponentFixture<CandidatePrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatePrepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatePrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
