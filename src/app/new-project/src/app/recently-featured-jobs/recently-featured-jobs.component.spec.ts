import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyFeaturedJobsComponent } from './recently-featured-jobs.component';

describe('RecentlyFeaturedJobsComponent', () => {
  let component: RecentlyFeaturedJobsComponent;
  let fixture: ComponentFixture<RecentlyFeaturedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyFeaturedJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentlyFeaturedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
