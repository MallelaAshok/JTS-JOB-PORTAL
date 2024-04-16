import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preview-job.component.html',
  styleUrls: ['./preview-job.component.scss']
})
export class PreviewJobComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  job_id: any;
  job_data:any;
  companyname :any = localStorage.getItem('CompanyName')
  
  job_Details :any  = this.formBuilder.group({
    api_key: environment.apiKey,
    job_id : [''],
   // user_id: this.authService.signUpData()?.id,
   user_id: localStorage.getItem('UserId'),
    job_title: ['', [Validators.required]],
    industry: ['', [Validators.required]],
    department: ['', [Validators.required]],
    role: ['', [Validators.required]],
    job_type: ['', [Validators.required]], //1=Full Time, 2=Part Time, 3=Contract,
    add_perks: ['', [Validators.required]],
    job_des: ['', [Validators.required]],
    min_salary: ['', [Validators.required]],
    max_salary: ['', [Validators.required]],
    location_type: ['', [Validators.required]],//1= Work From Office, 2= Work From Home,3= Hybrid
    wo_place: [''],//1= Specific city, 2= Anywhere in India
    wo_city: [''],
    wh_address: [''],
    wh_address2: [''],
    wh_city: [''],
    work_location_type: ['', [Validators.required]],//1= New address, 2= Same as registered address while signup(employer)
    wl_country: [''],
    wl_state: [''],
    wl_pincode: [''],
    wl_latitude: "22.7196° N",
    wl_longitude: "75.8577° E"
  });

  AddCanPrepForm :any;
  bindGrapData:any = Object.assign({})

  AddIntPrepForm :any;
  eduList:any;
  langList:any;
  
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.job_id = params['jobId'];
      this.authService.getEducationList().subscribe(edu=>{
        if(edu.code == 200){
          this.eduList = edu.data
          this.authService.getLanguageList().subscribe(li=>{
            if(li.code == 200){
              this.langList = li.data
              this.authService.getJobPreviewbyID(this.job_id).pipe(
                catchError(this.handleError)
              )
              .subscribe((result) => {
                if (result.status == "success") {
                  this.job_data = result
                  // this.job_data.forEach((data:any) => {
                  //   if(!data?.il_country){
                  //     data.il_country = result.ip_location.il_country
                  //   }
                  //   if(!data?.il_state){
                  //     data.il_state = result.ip_location.il_state
                  //   }
                  //   if(!data?.il_pincode){
                  //     data.il_pincode = result.ip_location.il_pincode
                  //   }
                  //   if(data.w_interview_time_from){
                  //     data.w_interview_time_from = data.w_interview_time_from.replace('T'," ");
                  //   }
                  //   if(data.w_interview_time_to){
                  //     data.w_interview_time_to = data.w_interview_time_to.replace('T'," ")
                  //   }
                  //   if(data.t_interview_time_to){
                  //     data.t_interview_time_to = data.t_interview_time_to.replace('T'," ");
                  //   }
                  //   if(data.t_interview_time_from){
                  //     data.t_interview_time_from = data.t_interview_time_from.replace('T'," ")
                  //   }
                  //   data.lan = '';
                  //   data.language.split(',').forEach((x:any) => {
                  //     let find = this.langList.find((y:any)=>y.id == x)
                  //     if(find){
                       
                  //       data.lan += find.language_name + ','
                  //     }
                  //   });
                  //   if(data?.lan!=""){
                  //     data.lan = data.lan.slice(0,-1);
                  //   }
                  //   data.api_key = environment.apiKey;
                  //   data['job_id'] = job_id;
                  //   this.binddata(this.job_data[0])
                       
                  // });
                
                 
                  // console.log(this.job_Details)
                 // this.authService.JobPreviewData.set(result.data)
                 //Interview
                 this.job_data.interviewer_preference[0].il_country=this.job_data.interviewer_preference[0].il_country??this.job_data?.ip_location?.il_country

                 this.job_data.interviewer_preference[0].il_pincode=this.job_data.interviewer_preference[0].il_pincode??this.job_data?.ip_location?.il_pincode

                 this.job_data.interviewer_preference[0].il_state=this.job_data.interviewer_preference[0].il_state??this.job_data?.ip_location?.il_state

                 if(this.job_data.interviewer_preference[0].w_interview_time_from){
                  this.job_data.interviewer_preference[0].w_interview_time_from = this.job_data?.interviewer_preference[0]?.w_interview_time_from.replace('T',' ');
                 }

                 if(this.job_data.interviewer_preference[0].w_interview_time_to){
                  this.job_data.interviewer_preference[0].w_interview_time_to = this.job_data?.interviewer_preference[0]?.w_interview_time_to.replace('T',' ');
                 }

                 if(this.job_data.interviewer_preference[0].t_interview_time_from){
                  this.job_data.interviewer_preference[0].t_interview_time_from = this.job_data?.interviewer_preference[0]?.t_interview_time_from.replace('T',' ');
                 }

                 if(this.job_data.interviewer_preference[0].t_interview_time_to){
                  this.job_data.interviewer_preference[0].t_interview_time_to = this.job_data?.interviewer_preference[0]?.t_interview_time_to.replace('T',' ');
                 }
                 


                       let find = this.eduList.find((y:any)=>y.id == this.job_data?.candidate_preference?.qualification)
                      if(find){
                        this.job_data.candidate_preference.quali = find.education
                      }


                      this.job_data.candidate_preference.lan = '';
                      this.job_data.candidate_preference.language.split(',').forEach((x:any) => {
                      let find = this.langList.find((y:any)=>y.id == x)
                      if(find){
                       
                        this.job_data.candidate_preference.lan += find.language_name + ','
                      }
                    });
                    if(this.job_data.candidate_preference?.lan!=""){
                      this.job_data.candidate_preference.lan = this.job_data.candidate_preference.lan.slice(0,-1);
                    }
                 //localStorage.setItem('JobId', result.data["job_id"]) ;
                 this.job_Details.disable();
                }
                this.authService.getRol()
             
              });
            }
           })
        }
       })
      
    

   
    });
    // this.authService.jobData()?.job_id;
    // this.authService.getJobPreviewbyID;
    // console.log(this.authService.JobPreviewData());
   
  }

  binddata(data:any){
    this.job_Details = this.formBuilder.group(
      {
        api_key: [environment.apiKey],
        job_id : [data.job_id],
       // user_id: this.authService.signUpData()?.id,
       user_id: localStorage.getItem('UserId'),
        job_title: [data?.job_title??''],
        industry: [data?.industry??''],
        department: [data?.department??''],
        role: [data?.role??''],
        job_type: [data?.job_type??''], //1=Full Time, 2=Part Time, 3=Contract,
        add_perks: [data?.perks??''],
        job_des: [data?.job_des??''],
        min_salary: [data?.min_salary??''],
        max_salary: [data?.max_salary??''],
        location_type: [data?.location_type??''],//1= Work From Office, 2= Work From Home,3= Hybrid
        wo_place: [data.wo_place??''],//1= Specific city, 2= Anywhere in India
        wo_city: [data.wo_city??''],
        wh_address: [data.wh_address??''],
        wh_address2: [data?.wh_address2??''],
        wh_city: [data.wh_city??''],
        work_location_type:[data.work_location_type??''],//1= New address, 2= Same as registered address while signup(employer)
        wl_country: [data?.wl_country??''],
        wl_state: [data?.wl_state??''],
        wl_pincode: [data?.wl_pincode??''],
        wl_latitude: "22.7196° N",
        wl_longitude: "75.8577° E"
      }
    );

    this.AddIntPrepForm = this.formBuilder.group({
      api_key: environment.apiKey,
      job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
      //   job_id : [''],
         // user_id: this.authService.signUpData()?.id,
      user_id: localStorage.getItem('UserId'),
  
      interview_type : [data?.interview_type??''],//1=walkin, 2=telephonic, 3=we will shortlist
  
       /*walkin interview*/
       /*interview location*/
      interview_location_type  : [data?.interview_location_type??''],//1= New address, 2= Same as registered address while signup(employer)
      il_country          : [data?.il_country??''],
      il_state            : [data?.il_state??''],
      il_pincode          : [data?.il_pincode??''],
      il_latitude         : "22.7196° N",
      il_longitude        : "75.8577° E",
  
      w_interview_date_from : [data?.w_interview_date_from??''],
      w_interview_date_to   : [data?.w_interview_date_to??''],
      w_interview_time_from : [data?.w_interview_time_from??''],
      w_interview_time_to   : [data?.w_interview_time_to??''],
  
      /*telephonic interview*/
      t_interview_date           :[data?.t_interview_date ??''],
      t_interview_time_from      :[data?.t_interview_time_from??''],
      t_interview_time_to        :[data?.t_interview_time_to??''],
      t_contact_person           :[data?.t_contact_person??''],  
      t_contact_number           :[data?.t_contact_number??''],     
  
      /*shorlist interview*/
      s_send_resume              :[data?.s_send_resume??''],//0=no, 1=yes
      s_email                    :[data?.s_email??'']//if s_send_resume = yes
      
    });

    this.AddCanPrepForm = this.formBuilder.group({
      api_key: environment.apiKey,
      job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
   //   job_id : [''],
      // user_id: this.authService.signUpData()?.id,
      user_id: localStorage.getItem('UserId'),
      gender: [data?.gender??''],//1=male, 2= female, 3= other
      min_age: [data?.min_age??''],
      max_age: [data?.max_age??''],
      is_preference: [data?.is_preference??''],//0 = bydefault, 1= if checked
      qualification: [data?.qualification??''],
      experience_type: [data?.experience_type??''],//1= fresher, 2= experienced,3= any
      min_experience: [data?.min_experience??''],
      any_experience: [data?.any_experience??''],
      skills: [data?.skills??''],
      app_location_type: [data?.app_location_type??''],//1=anywhere,2=specific location
      al_country: [data?.al_country??''],
      al_state: [data?.al_state??''],
      al_city: [data?.al_city??''],
      notice_period: [data?.notice_period??''],
      language: [data?.language??'']
    });
    this.job_Details.disable();
    this.AddIntPrepForm.disable();
    this.AddCanPrepForm.disable()
  }
  edit(type:string){
    if(type =="interview"){
      this.AddIntPrepForm.controls?.il_pincode?.enable();
      this.AddIntPrepForm.controls?.il_state?.enable();
      this.AddIntPrepForm.controls?.il_country?.enable();
      this.AddIntPrepForm.controls?.t_contact_number?.enable();
      this.AddIntPrepForm.controls?.t_contact_person?.enable();
      this.AddIntPrepForm.controls?.s_email?.enable();
      this.AddIntPrepForm.controls?.w_interview_time_from?.enable();
      this.AddIntPrepForm.controls?.w_interview_time_to?.enable();

      this.router.navigate(['../new-job']);
      const id = { jobId: this.job_id};
       this.router.navigate(['jobs/preview-job'], { queryParams: id });

    }else if(type =="Candidate"){
      this.AddCanPrepForm.controls?.qualification?.enable();
      this.AddCanPrepForm.controls?.min_experience?.enable();
      this.AddCanPrepForm.controls?.any_experience?.enable();
      this.AddCanPrepForm.controls?.language?.enable();

      this.router.navigate(['../add-Candidate-prep'])
      const id = { jobId: this.job_id};
       this.router.navigate(['jobs/preview-job'], { queryParams: id });
    }else{
        this.job_Details.controls?.job_title?.enable();
        this.job_Details.controls?.wh_address?.enable();
        this.job_Details.controls?.min_salary?.enable();
        this.job_Details.controls?.max_salary?.enable();
        this.job_Details.controls?.add_perks?.enable();

        this.router.navigate(['../new-job'])
        const id = { jobId: this.job_id};
         this.router.navigate(['jobs/preview-job'], { queryParams: id });
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  navigate(name:string){
    this.router.navigate([`/jobs/${name}`],{queryParams:{
      jobId:this.job_id
    }})
  }

  saveJob() {
    // var data :any =Object.assign({});
    // var data1:any = Object.assign({});
    // var data2:any =Object.assign({});
    // Object.keys(this.job_Details.controls).forEach(x=>{
    //   data[x] = this.job_Details.controls[x].value
    // })
    // Object.keys(this.AddIntPrepForm.controls).forEach(x=>{
    //   data1[x] = this.AddIntPrepForm.controls[x].value
    // })
    // Object.keys(this.AddCanPrepForm.controls).forEach(x=>{
    //   data2[x] = this.AddCanPrepForm.controls[x].value
    // })
    // this.authService.finalupdate(data,data1,data2).pipe(
    //   catchError(this.handleError)
    // ).subscribe((result:any)=>{
    //   if(result[0].code == 200 && result[1].code == 200 && result[2].code == 200){
        Swal.fire({
          title: 'Job Created Successfully',
          // text: "You won't be able to revert this!",
          icon: 'success',
          // showCancelButton: false,
          // confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          // confirmButtonText: 'Confirm',
        }).then((result) => {
          if (result.value) {
            // Swal.fire(
            //   'Account created!',
            //   'Your account has been created.',
            //   'success'
            // );
            this.authService.toDashboard.set('2')
            setTimeout(()=>{
              this.router.navigate(['./dashboard']);
            },100)
            
          }
        });
    //   }
    // });
    
  }

}
