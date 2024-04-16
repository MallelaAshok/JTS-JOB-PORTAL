import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
declare var $:any;
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit{
  display:string = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
  setTimeout(()=>{
$('.ngx-otp-input-container').find('input').css({'background':'transparent'})
  },100)
  }
  
  value:boolean=true
  loginClassname:any='login-page-main'
  Logo:any='Logo'


  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: false,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
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

  handleFillEvent(value: string): void {
    // this.SignInForm.patchValue({
    //   otp_code: value,
    // });
  }

  getOtp(){
    this.timer(2);
  }
  timer(minute:number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: unknown = "0";
    let statSec = 60;


    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = statSec;
      } else textSec = statSec;

      this.display = `${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
