import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview-prep',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interview-prep.component.html',
  styleUrls: [ './interview-prep.component.scss']
})
export class InterviewPrepComponent implements OnInit {
  ngOnInit(): void {
    this.route.queryParams.subscribe(x=>{
      if(x['jobId']){
        this.binddata(x['jobId'])
      }
    })
  }

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute)
  error = false;

  AddIntPrepForm = this.formBuilder.group({
    api_key: environment.apiKey,
    job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
    //   job_id : [''],
       // user_id: this.authService.signUpData()?.id,
    user_id: localStorage.getItem('UserId'),

    interview_type : ['3',[Validators.required]],//1=walkin, 2=telephonic, 3=we will shortlist

     /*walkin interview*/
     /*interview location*/
    interview_location_type  : [''],//1= New address, 2= Same as registered address while signup(employer)
    il_country          : [''],
    il_state            : [''],
    il_pincode          : [''],
    il_latitude         : "22.7196° N",
    il_longitude        : "75.8577° E",

    w_interview_date_from : [''],
    w_interview_date_to   : [''],
    w_interview_time_from : [''],
    w_interview_time_to   : [''],

    /*telephonic interview*/
    t_interview_date           :[''],
    t_interview_time_from      :[''],
    t_interview_time_to        :[''],
    t_contact_person           :[''],  
    t_contact_number           :[''],     

    /*shorlist interview*/
    s_send_resume              :[''],//0=no, 1=yes
    s_email                    :['']//if s_send_resume = yes
    
  });


  ItypeAr = [
    { name: 'interview_type', label: 'Walkin', value: '1' },
    { name: 'interview_type', label: 'Telephonic', value: '2' },
    { name: 'interview_type', label: 'We will shortlist', value: '3' }
  ]

  IaddAr = [
    { name: 'interview_location_type', label: 'New address', value: '1' },
    { name: 'interview_location_type', label: 'Same', value: '2' },
  ]

  InAdd = [
    { name: 'il_country', label: 'Country'},
    { name: 'il_state', label: 'State'},
    { name: 'il_pincode', label: 'Pincode'}
  ]

  IDat = [
    { name: 'w_interview_date_from', label: 'From',type: 'date'},
    { name: 'w_interview_date_to', label: 'To',type: 'date'},
    { name: 'w_interview_time_from', label: 'From',type: 'datetime-local'},
    { name: 'w_interview_time_to', label: 'To',type: 'datetime-local'}
  ]

  Itel = [
    { name: 't_interview_date', label: 'Date',type: 'date'},
    { name: 't_interview_time_from', label: 'From',type: 'datetime-local'},
    { name: 't_interview_time_to', label: 'To',type: 'datetime-local'},
    { name: 't_contact_person', label: 'Contact Person',type: 'text'},
    { name: 't_contact_number', label: 'Contact Phone',type: 'text'}
  ]

  SIArr = [
      { name: 's_send_resume', label: 'Yes', value: '1' },
      { name: 's_send_resume', label: 'No', value: '2' }
    ]

    SAd = [
      { name: 's_email', label: 'Enter Your Email'}
    ]
  
  
  onSubmit() {
    var checked = 0;
    
    if(this.AddIntPrepForm.controls.interview_type.value == "1" ){
      if(this.AddIntPrepForm.controls.interview_location_type.value =="1"){
        if(this.AddIntPrepForm.controls.il_country.value==''||this.AddIntPrepForm.controls.il_state.value!=''|| this.AddIntPrepForm.controls.il_pincode.value=='' ){
             checked +=1;
        }
      }else if(this.AddIntPrepForm.controls.interview_location_type.value =="2"){
          
      }else{  
        checked +=1;
      }

      if(this.AddIntPrepForm.controls.w_interview_time_to.value == "" || this.AddIntPrepForm.controls.w_interview_time_from.value == "" ||this.AddIntPrepForm.controls.w_interview_date_to.value == "" ||this.AddIntPrepForm.controls.w_interview_date_from.value == "" ){
        checked +=1
      }
    }
    if (this.AddIntPrepForm.valid  || (this.AddIntPrepForm.controls.interview_type.value=="1" && checked==0)) {
      this.error = false;
      this.authService.addIntPre(this.AddIntPrepForm.value);
    }else{
      this.error = true;
    }

  }

  binddata(jobId:any){
    this.authService.getJobPreviewbyID(jobId)
    .subscribe((result) => {
      if (result.status == "success") {
        var job_data = result.interviewer_preference
        // job_data.forEach((data:any) => {
        //   // if(data.w_interview_time_from){
        //   //   data.w_interview_time_from = data.w_interview_time_from.replace('T'," ");
        //   // }
        //   // if(data.w_interview_time_to){
        //   //   data.w_interview_time_to = data.w_interview_time_to.replace('T'," ")
        //   // }
        //   data.api_key = environment.apiKey;
        //   data['job_id'] = jobId;
        //   this.binddata(job_data[0]);
        // });
        var data = job_data[0]
      
        this.authService.JobPreviewData.set(result)
      //  localStorage.setItem('JobId', result.data["job_id"]) ;
   

       this.AddIntPrepForm = this.formBuilder.group({
        api_key: environment.apiKey,
        job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
        //   job_id : [''],
           // user_id: this.authService.signUpData()?.id,
        user_id: localStorage.getItem('UserId'),
    
        interview_type : [data?.interview_type??'3'],//1=walkin, 2=telephonic, 3=we will shortlist
    
         /*walkin interview*/
         /*interview location*/
        interview_location_type  : [data?.interview_location_type??''],//1= New address, 2= Same as registered address while signup(employer)
        il_country          : [data?.il_country??result?.ip_location?.il_country??''],
        il_state            : [data?.il_state??result?.ip_location?.il_state??''],
        il_pincode          : [data?.il_pincode??result?.ip_location?.il_pincode??''],
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

     
      
     
      }
      
   
    });
  }
}
