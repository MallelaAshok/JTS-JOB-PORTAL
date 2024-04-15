import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { CustomValidators } from 'src/app/core/models/customValidators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {


  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router)
  submitted = false;
  error: string | null = '';

  


  SignUpForm = this.formBuilder.group({
    api_key: environment.apiKey,
    role_id: 3,//role id 3 is static for employer
    //mobile: this.authService.sigiInData()?.mobile,
   mobile: localStorage.getItem('MobileNo'),
    company_name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,}')]],
    is_compOrConstOrPers: 1,//send 1 only for company(static)
    industry: ['', [Validators.required]],
    website: ['', [Validators.required, CustomValidators.website]],
    company_des: ['', [Validators.required]],
    company_size: ['', [Validators.required]],
    contact_person: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
    designation: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    reg_address: ['', [Validators.required, Validators.minLength(4)]],
    gst: ['', [Validators.required, Validators.pattern('[A-Z0-9]{15,}')]]
  });

  ngOnInit() {

    this.getIndustry();
    this.authService.getIndustryList().subscribe(x=>{
      if(x.code == 200){
        this.authService.IndustryData.set(x.data)
      }
    });
}


  static website(control: AbstractControl): { [key: string]: boolean } | null {
    if (Validators.required(control) !== null) {
      return null;
    }
    const value = control.value;
    if (!value.startsWith('https://') && !value.startsWith('www.')) {
      return { 'invalidWebsite': true };
    }
    return null;
  }

  // Industry = [
  //   { id: 1, industry_name: "IT", is_active: 1 },
  //   { id: 2, industry_name: "HR", is_active: 1 },
  //   { id: 7, industry_name: "Commers", is_active: 0 }
  // ]

  compSize = [
    { Csize: "1-10" },
    { Csize: "11-50" },
    { Csize: "51-100" },
    { Csize: "101-200" },
    { Csize: "201-1000" },
    { Csize: "1001 & Above" }
  ]


  get SignUpFormControl() {
    return this.SignUpForm.controls;
  }

  getIndustry(){

  
  
    // this.authService.getCityList();
    // this.authService.getExp();
    // this.authService.getLanLevel();
    // this.authService.getRol();

  }

  onSubmit() {
    console.log(this.authService.sigiInData())
    if (this.SignUpForm.valid) {
      Swal.fire({
        title: "Do you want to Confirm?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        // denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          
          Swal.fire("Saved!", "", "success");
          this.authService.signup(this.SignUpForm.value);
          this.error = this.authService.errorValue();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      this.error = "Please fill all the fields correctly"
    }

  

  }



  customWithFunction() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        //   'Account created!',
        //   'Your account has been created.',
        //   'success'
        // );
        this.router.navigate(['/dashboard/main']);
      }
    });
  }
}
