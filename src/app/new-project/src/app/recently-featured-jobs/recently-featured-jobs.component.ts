import { NgFor, NgForOf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recently-featured-jobs',
  standalone: true,
  imports: [NgStyle,NgForOf],
  templateUrl: './recently-featured-jobs.component.html',
  styleUrl: './recently-featured-jobs.component.css'
})
export class RecentlyFeaturedJobsComponent {
   numbersArray: any[] = [
    {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
    {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
    {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
    {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
     {
    jobTitel:'JaVa',
    jobtybe:"jts business services",
    location:'bangalore, india',
    },
    
  ]
}
