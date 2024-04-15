import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl,FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from 'src/app/core/models/customValidators';
import { ReplaySubject } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent {

  public editorContent = '<p>Type your text here...</p>';
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute)
  error = false;  submitted = false;

  public editorConfig = {
    height: '500px',
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  };

  peakdata:any []=[];
  rolelist :any [] = [];
  deplist :any[]=[];
  industrylist :any[]=[];
  Salarywarning:Boolean=false;
  public Editor = ClassicEditor;
  public editorData = '<p>Type your text here...</p>';
  public config = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  };

  AddJobForm = this.formBuilder.group({
    api_key: environment.apiKey,
    job_id : [''],
   // user_id: this.authService.signUpData()?.id,
   user_id: localStorage.getItem('UserId'),
    job_title: ['', [Validators.required]],
    industry: ['', [Validators.required]],
    department: ['', [Validators.required]],
    role: ['', [Validators.required]],
    job_type: ['', [Validators.required]], //1=Full Time, 2=Part Time, 3=Contract,
    add_perks: [''],
    job_des: [''],
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


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.queryParams.subscribe(x=>{
      this.authService.getPerkList()
        .subscribe((result) => {
         
          if (result.status == "success") {
           
            console.log(result);
            result.data.forEach((x:any)=>{
              x.sign = "P"

            })
            this.peakdata = result.data;
            if(x['jobId']){
              this.binddata(x['jobId'])
            }
          } 
        
      });

      
    })
         this.authService.getRol()
        .subscribe((result) => {
         
            if (result.status == "success") {
              //  this.clickIn = 0;
              console.log(result);
              this.rolelist = result.data;
              this.AddJobForm.controls.role.setValue(this.rolelist[0].id)
            
            } 
          
        });
        this.authService.getDepartmentList()
        .subscribe((result) => {
         
            if (result.status == "success") {
            
              console.log(result);
              this.deplist = result.data;
              this.AddJobForm.controls.department.setValue(this.deplist[0].id)
            
            } 
          
        });
        this.authService.getIndustryList()
        .subscribe((result) => {
         
            if (result.status == "success") {
             
              console.log(result);
              this.industrylist = result.data;
              this.AddJobForm.controls.industry.setValue(this.industrylist[0].id)
            
            } 
          
        });

        
  }
  addpeaks(job:any,val:any,id:string,i:Number){
    var myElement:any = document.getElementById(id+i);
    if(val?.sign == "P"){
      val.sign = "I";
      job.Array.push( val?.id)
      myElement.style.backgroundColor = "aliceblue";
      myElement.style.color = "rgb(1, 158, 255)";
    }
    else{
      let indexToDelete = job.Array.findIndex((x:string)=>x == val?.id);
      if (indexToDelete !== -1) {
        job.Array.splice(indexToDelete, 1);
        val.sign = "P";
        myElement.style.backgroundColor = "";
        myElement.style.color = "black";
      }
    }

  }

  updateContent(event: any) {
    this.editorContent = event.target.innerHTML;
    this.AddJobForm.controls.job_des.setValue(event.target.innerHTML)
  }

  toggleBold() {
    document.execCommand('bold', false, '');
  }

  toggleItalic() {
    document.execCommand('italic', false, '');
  }

  toggleUnderline() {
    document.execCommand('underline', false, '');
  }

  clearFormatting() {
    document.execCommand('removeFormat', false, '');
  }
  toggleOrderedList() {
    document.execCommand('insertOrderedList', false, '');
  }

  toggleUnorderedList() {
    document.execCommand('insertUnorderedList', false, '');
  }

  changeselect(job:any,ev:any){
   var data = job.Array.find((x:String)=>x== ev.target.value);
    if(!data){
      job.Array.push(ev.target.value)
    }
  }
  binddata(jobId:any){
    this.authService.getJobPreviewbyID(jobId)
    .subscribe((result) => {
      if (result.status == "success") {
        var data = result.job_preference[0]
    
          // if(data.w_interview_time_from){
          //   data.w_interview_time_from = data.w_interview_time_from.replace('T'," ");
          // }
          // if(data.w_interview_time_to){
          //   data.w_interview_time_to = data.w_interview_time_to.replace('T'," ")
          // }
          data.api_key = environment.apiKey;
          data['job_id'] = jobId;
         
       
      
        this.AddJobForm.patchValue(
          {
            api_key: environment.apiKey,
            job_id : data.job_id,
           // user_id: this.authService.signUpData()?.id,
           user_id: localStorage.getItem('UserId'),
            job_title: data?.job_title??'',
            industry: data?.industry??'',
            department: data?.department??'',
            role: data?.role??'',
            job_type: data?.job_type??'', //1=Full Time, 2=Part Time, 3=Contract,
            add_perks: data?.perks??'',
            job_des: data?.job_des??'',
            min_salary: data?.min_salary??'',
            max_salary: data?.max_salary??'',
            location_type: data?.location_type??'',//1= Work From Office, 2= Work From Home,3= Hybrid
            wo_place: data.wo_place??'',//1= Specific city, 2= Anywhere in India
            wo_city: data.wo_city??'',
            wh_address: data.wh_address??'',
            wh_address2: data?.wh_address2??'',
            wh_city: data.wh_city??'',
            work_location_type:data.work_location_type??'',//1= New address, 2= Same as registered address while signup(employer)
            wl_country: data?.wl_country??'',
            wl_state: data?.wl_state??'',
            wl_pincode: data?.wl_pincode??'',
            wl_latitude: "22.7196° N",
            wl_longitude: "75.8577° E"
          }
        );
        var jobdes:any = document.getElementById('des_id')
        jobdes.innerHTML=data?.job_des
        this.authService.JobPreviewData.set(result.data)
       //localStorage.setItem('Job_Id', result.data["job_id"]) ;
       data.perks.split(',').forEach((pk:any) => {
        this.peakdata.forEach((x:any,i:any)=>{
          if(pk.trim() == x.perk_name.trim()){
            x.sign = "I"
            var pk1:any =  document.getElementById('peak'+i);
            var arr:any = this.jobsArray[7].Array
                 arr.push(x.id);
               pk1.style.backgroundColor = "aliceblue";
               pk1.style.color = "rgb(1, 158, 255)";
          }
       
        })
       
       });
      }
      
   
    });
  }

  onlynumbers(ev:any){
    var str ='1234567890'
    if(str.includes(ev.key)){
      return true;
    }else{
      return false
    }
  }
 






  get AddJobFormControl() {
    return this.AddJobForm.controls;
  }
  specificCity = [
    { name: 'wo_city', label: 'City' }  
  ]

  jobsArray = [
    { name: 'job_title', label: 'Job Title' },
    { name: 'role', label: 'Role', options: this.rolelist},
    { name: 'department', label: 'Department',options:this.deplist },
    { name: 'industry', label: 'Industry',options:this.industrylist },
    { name: 'job_type', label: 'Job Type' },
    { name: 'salary', label: 'Salary Range' },
    { name: 'location_type', label: 'Work Type' },
    { name: 'add_perks', label: 'Benifits & Perks' ,Array:[] },
    { name: 'work_location_type', label: 'Work Location' },
    { name: 'job_des', label: 'Job Description' }
  ]


  jobType = [
    { name: 'job_type', label: 'Full Time', value: '1' },
    { name: 'job_type', label: 'Part Time', value: '2' },
    { name: 'job_type', label: 'Contract', value: '3' }
  ]

  SalaryRange = [
    { name: 'min_salary', label: 'Salary Range' },
    { name: 'max_salary', label: 'Salary Range' }
  ]

  WorkType = [
    { name: 'location_type', label: 'Work From Office', value: '1' },
    { name: 'location_type', label: 'Work From Home', value: '2' },
    { name: 'location_type', label: 'Hybrid', value: '3' }
  ]

  workFromOffice = [
    { name: 'wh_address', label: 'Office Address/Landmark' }
  ]
  workFromHome = [
    { name: 'wo_place', label: 'Specific City', value: '1' },
    { name: 'wo_place', label: 'Anywhere From India', value: '2' }
  ]

 

  locationType = [
    { name: 'work_location_type', label: 'New address', value: '1' },
    { name: 'work_location_type', label: 'Same address', value: '2' }
  ]

  newAddress = [
    { name: 'wl_country', label: 'Country' },
    { name: 'wl_state', label: 'State' },
    { name: 'wl_pincode', label: 'Pincode' }
  ]

  onSubmit() {
    var obj = {...this.AddJobForm.value}
    obj.add_perks=this.jobsArray[7].Array?.join(',');
    if (this.AddJobForm.valid && this.jobsArray[7].Array?.length!=0 && this.AddJobForm.controls.job_des.value?.trim()!='' && !this.Salarywarning) {
      this.error=false;
      this.authService.addJob(obj);
    }else{
      this.error=true;
    }
  }

  deletebtn(cap:any,name:any){
    let indexToDelete = cap.Array.findIndex((x:string)=>x == name);
   if (indexToDelete !== -1) {
     cap.Array.splice(indexToDelete, 1);
   }
 }
 salarychange(ev:any){
      ev.preventDefault();
      var max:any = Number(this.AddJobForm.controls.max_salary.value)??0;
      var min:any = Number(this.AddJobForm.controls.min_salary.value)??0
      if(max>0 && (min>0|| min == 0)){
        if(max < min){
          this.Salarywarning = true;
        }else{
          this.Salarywarning = false;
        }
      }else{
        this.Salarywarning = false;
      }
      
 }

}
