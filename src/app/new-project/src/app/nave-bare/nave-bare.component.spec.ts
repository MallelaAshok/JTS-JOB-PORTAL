import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaveBareComponent } from './nave-bare.component';

describe('NaveBareComponent', () => {
  let component: NaveBareComponent;
  let fixture: ComponentFixture<NaveBareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaveBareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaveBareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
