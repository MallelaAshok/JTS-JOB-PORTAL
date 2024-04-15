import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [NgClass,NgIf,NgStyle],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  constructor(private router: Router) {}
  
  value:boolean=true
  loginClassname:any='login-page-main'
  Logo:any='Logo'
  nextPage(e:any){
     if(e=='home'){
       this.value=false
       this.Logo="Logohome"
       this.loginClassname='login-homepage-main'
       this.router.navigate(['/home'])
       
       return this.loginClassname
     }
      if(e=='/'){
       this.value=true
        this.Logo="Logo"
       this.loginClassname='login-page-main'
       this.router.navigate(['/'])
       return this.loginClassname
     }
    
  }

}
