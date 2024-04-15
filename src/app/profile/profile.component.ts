import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit,OnDestroy{

  authService = inject(AuthService);
  //datepipe = inject(DatePipe);
  Subscription:Subscription = new Subscription();
  // Form 1
  register!: UntypedFormGroup;
  hide = true;

  constructor(private fb: UntypedFormBuilder,public datepipe:DatePipe) {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getUserByUserId();
    
  }
  initForm() {
    this.register = this.fb.group({
      companyname:[''],
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      contactnumber:[''],
      companysize:[''],
      gstnumber:[''],
      website:[''],
      address: [''],
      zipcode:[''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
      aboutcompany:['']
    });
  }


  getUserByUserId(){
    var obj = {
      role_id:3,
      mobile:localStorage.getItem('MobileNo'),
      api_key  : "seekk!@#$%2023"
    }
    this.Subscription.add(
      this.authService.getProfileByMob(obj).subscribe((res:any)=>{
       if(res.code==200){
        var details = res.data
        
        this.register.patchValue({
          companyname:details.company_name,
          first: [details.first_name??''],
          last: [details.last_name??''],
          password: [details.password??''],
          email: [details.email??''],
          contactnumber:[details.mobile??''],
          companysize:[details.company_size??''],
          gstnumber:[details.gst??''],
          website:[details.website??''],
          address: [details.reg_address??''],
          zipcode:[details?.emplr_zip_code],
          city: [details.emplr_city??''],
          state: [details.emplr_state??''],
          country: [details.emplr_country??''],
          termcondition: [details.is_terms_condition == 0 ? false : true],
          aboutcompany:[details.company_des??'']
        })

        if(details.user_avatar){
          $('.imgprofile').attr('src','https://sktexus.com/seekk_api/assets/api/images/'+details.user_avatar)
        }
     
       }
      })

    )
  }
  error:boolean = false
  onRegister() {
    this.error = false;
    console.log('Form Value', this.register.value);
    var obj = Object.assign({});
      if(this.register.controls['companyname'].value=='' ||this.register.controls['email'].value==''||this.register.controls['website'].value==''||
      this.register.controls['companysize'].value==''||this.register.controls['gstnumber'].value==''||this.register.controls['aboutcompany'].value==''||
      this.register.controls['address'].value=='' || this.register.controls['country'].value==''||this.register.controls['city'].value==''||this.register.controls['zipcode'].value==""
      ||this.register.controls['state'].value==''
      ){
       this.error= true
        return;
      }

    obj.api_key = "seekk!@#$%2023";
    obj.role_id = 3;
    obj.mobile = localStorage.getItem('MobileNo');
    obj.company_name = this.register.controls['companyname'].value;
    obj.email = this.register.controls['email'].value;
    obj.website = this.register.controls['website'].value;
    obj.company_size = this.register.controls['companysize'].value;
    obj.gst = this.register.controls['gstnumber'].value;
    obj.company_des = this.register.controls['aboutcompany'].value;
    obj.logo =$('.imgprofile').attr('src');
  //Address
    obj.address = this.register.controls['address'].value;
    obj.country = this.register.controls['country'].value;
    obj.city = this.register.controls['city'].value;
    obj.zip_code = this.register.controls['zipcode'].value;
    obj.state = this.register.controls['state'].value;
    obj.date = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    obj.latitude = '';
    obj.longitude = "",

    obj.logo =$('.imgprofile').attr('src');



    this.Subscription.add(
      this.authService.editProfile(obj).subscribe(res=>{

      })
    )
  }

  uploadimage(event:any){
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        $('.imgprofile').attr('src',base64Image)
        console.log('Uploaded image:', base64Image);
      };
      reader.readAsDataURL(file); 
    }
  }
}
