import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ManagedRecruitmentComponent } from '../managed-recruitment/managed-recruitment.component';
import { TopRecruitersComponent } from '../top-recruiters/top-recruiters.component';

@Component({
  selector: 'app-logincontentent',
  standalone: true,
  imports: [ManagedRecruitmentComponent,TopRecruitersComponent],
  templateUrl: './logincontentent.component.html',
  styleUrl: './logincontentent.component.css'
})
export class LogincontententComponent {

}
