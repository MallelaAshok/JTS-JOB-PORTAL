import { AuthService } from 'src/app/core/service/auth.service';
import { Component, ElementRef, ViewChild, inject, signal} from '@angular/core';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input'; // Add this import statement
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent{

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  errorMessage = "";
  display: unknown;
  getMsg = true;
 
  @ViewChild('otpInput') otpInputRef: any;
  
  SignInForm = this.formBuilder.group({
    api_key: environment.apiKey,
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
    otp_code: ['', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]],
    role: 3
  });

  name :any
  getOtp(){
    this.getMsg = false;
    if(this.SignInForm.controls.mobile.status==="VALID"){
      this.errorMessage = "";
      this.timer(1);
      const otp = {
        "api_key": environment.apiKey,
        "mobile" : Number(this.SignInForm.value.mobile),
        "role_id": 3
     }
     this.authService.getOtp(otp)
    .subscribe((result) => {
      console.log(result);
      this.name=result.temp_otp;
      localStorage.setItem('authToken', result.token);
      this.authService.OtpValue.set(result);
      // setTimeout(() => {
      //   const otpInputElement = this.otpInputRef?.inputs;
      //   result.temp_otp.toString().forEach((Num:any,i:number) => {
      //     otpInputElement[i].value = Num
      //    });
      //   // otpInputElement.value = result.temp_otp; // Assign the OTP value programmatically
      //   // otpInputElement.dispatchEvent(new Event('input')); // Trigger input event to notify ngx-otp-input
      // }, 2000);
      
    });
     }else{
      this.errorMessage = "Please Enter 10 digit mobile number"
    }

  }

  get SignInFormControl() {
    return this.SignInForm.controls;
  }


  onSubmit(){
    if(this.authService.OtpValue()?.status==="failed"){
      this.errorMessage = "Please login Again";
    }else if(this.SignInForm.valid){
      if(this.authService.OtpValue()?.temp_otp == this.SignInForm.value.otp_code){
        console.log(this.SignInForm.value)
        this.authService.signin(this.SignInForm.value);
      }else{
        this.errorMessage = "Please Enter Correct OTP code";
      }
      }else{
        this.errorMessage = "Please Enter OTP";
      }
      
    }

    
  
   otpval:any
  handleFillEvent(value: string): void {
    this.SignInForm.patchValue({
      otp_code: value,
    });
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

 
}
