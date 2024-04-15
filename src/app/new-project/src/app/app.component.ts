import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaveBareComponent } from './nave-bare/nave-bare.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomeComponent } from './home/home.component';
import { LogincontententComponent } from './logincontentent/logincontentent.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginpageComponent,LogincontententComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'new-project';
}
