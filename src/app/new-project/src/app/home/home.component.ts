import { Component } from '@angular/core';
import { PopularCategoriesComponent } from '../popular-categories/popular-categories.component';
import { RecentlyFeaturedJobsComponent } from '../recently-featured-jobs/recently-featured-jobs.component';
import { RecruitersHedingComponent } from '../recruiters-heding/recruiters-heding.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopularCategoriesComponent,RecentlyFeaturedJobsComponent,RecruitersHedingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  
}
