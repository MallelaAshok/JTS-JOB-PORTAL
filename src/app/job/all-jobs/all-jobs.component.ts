import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent {
  authService = inject(AuthService);
  

  ngOnInit() {
    this.authService.getEmployeeByID(localStorage.getItem('UserId'));
    // this.authService.signup(localStorage.getItem('UserId'));
    
    
  }
}
