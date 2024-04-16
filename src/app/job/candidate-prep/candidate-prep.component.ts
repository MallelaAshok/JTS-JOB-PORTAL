import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-prep',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './candidate-prep.component.html',
  styleUrls: ['./candidate-prep.component.scss']
})
export class CandidatePrepComponent implements OnInit {
  route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.route.queryParams.subscribe(x=>{
      this.authService.getEducationList().subscribe(x=>{
        if(x.code == 200){
          this.eduList = x.data
        }
       })
       this.authService.getSkillList().subscribe(x=>{
        if(x.code == 200){
          x.data.forEach((el:any) => {
            el.sign = "P";
          });
          this.skillList = x.data
          
        }
       })
       this.authService.getNoticePeriodList().subscribe(x=>{
        if(x.code == 200){
          this.noticeperiodList = x.data
        }
       })
    
      //  this.authService.getEngLvlList().subscribe(x=>{
      //   if(x.code == 200){
      //     this.rateLanguage = x.data
      //    this.radwidth = 100/this.rateLanguage.length + '%'
      //   }
      //  })
    
       this.authService.getLanguageList().subscribe(x=>{
        if(x.code == 200){
          this.langList = x.data
        }
       })
       setTimeout(()=>{
        if(x['jobId']){
          this.binddata(x['jobId'])
        }
       },500)
      
    })


  }


  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  eduList:any[]=[];
  skillList:any[]=[];
  noticeperiodList:any[]=[];
  langList:any[]=[];
  engLvList:any[]=[];
  suggestedSkillarray:any[]=[]
  error = false;



  AddCanPrepForm = this.formBuilder.group({
    api_key: environment.apiKey,
    job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
 //   job_id : [''],
    // user_id: this.authService.signUpData()?.id,
    user_id: localStorage.getItem('UserId'),
    gender: ['', [Validators.required]],//1=male, 2= female, 3= other
    min_age: [''],
    max_age: [''],
    is_preference: [false],//0 = bydefault, 1= if checked
    qualification: [''],
    experience_type: [''],//1= fresher, 2= experienced,3= any
    min_experience: [''],
    any_experience: [''],
    skills: [''],
    app_location_type: ['', [Validators.required]],//1=anywhere,2=specific location
    al_country: [''],
    al_state: [''],
    al_city: [''],
    notice_period: [''],
    language: ['']
  });


  CanPrepArray = [
    { name: 'gender', label: 'Gender' },
    { name: 'Age', label: 'Age Group' },
    { name: 'is_preference', label: 'No Preference' },
    { name: 'qualification', label: 'Qualification',array:[] },
    { name: 'experience_type', label: 'Experience Required' },
    { name: 'skills', label: 'Skills',array:[] },
    { name: 'app_location_type', label: 'Recive Application From' },
    { name: 'notice_period', label: 'Notice Period' },
    { name: 'language', label: 'Language' ,array:<any>[] }
  ]

  genderArray = [
    { name: 'gender', label: 'Male', value: '1' },
    { name: 'gender', label: 'Female', value: '2' },
    { name: 'gender', label: 'Both Male & Female', value: '3' }
  ]

  AgeRange = [
    { name: 'min_age', label: 'Min' },
    { name: 'max_age', label: 'Max' }
  ]

  rateLanguage:any[] =[
    {label:'Professinal',value:3 ,name:'lan'},
    {label:'Intermediate',value:2,name:'lan'},
    {label:'Beginner',value:1,name:'lan'}
  ]

  expTypeArray = [
    { name: 'experience_type', label: 'Fresher', value: '1' },
    { name: 'experience_type', label: 'Experienced', value: '2' },
    { name: 'experience_type', label: 'Any', value: '3' }
  ]

  expArray = [
    { name: 'min_experience', label: 'Minimum Experience' },
  ]

  MinExp = [
    { value: '1', option: '0-1 Year' },
    { value: '2', option: '1-3 Year' },
    { value: '3', option: '3-5 Year' },
    { value: '4', option: '5-7 Year' },
    { value: '5', option: '7-9 Year' },
    { value: '6', option: '9+ Year' }
  ]

  anyExp = [
    { name: 'any_experience', label: 'Any Experiance' }
  ]

  bindlabel(cap:any,ev:Event){
   ev.preventDefault();
   if(cap.name == "skills")
    if(this.AddCanPrepForm.controls.skills.value!=""){
     cap.array.push(this.AddCanPrepForm.controls.skills.value)
     this.AddCanPrepForm.controls.skills.setValue('')
    

    }
    if(cap.name == "qualification"){
    if(this.AddCanPrepForm.controls.qualification.value!=""){
     cap.array.push(this.AddCanPrepForm.controls.qualification.value);
     this.AddCanPrepForm.controls.qualification.setValue('');
    
    }}
    if(cap.name == "language"){
      if(this.AddCanPrepForm.controls.language.value!=""){
       cap.array.push(this.AddCanPrepForm.controls.language.value);
       this.AddCanPrepForm.controls.language.setValue('');
       
      }}


  }

  getSuggestedSkill(ev:any){
    this.suggestedSkillarray = [];
  if(ev.target.value.length>0){
    var data = {
      "api_key" : "seekk!@#$%2023",
      "skill"  : ev.target.value
  }
  this.authService.getSuggestedSkill(data).pipe().subscribe(x=>{
    if(x.code == 200){
      if(ev.target.value.length == 0){
        this.suggestedSkillarray = [];
      }else{
        this.suggestedSkillarray = x.data
      }
    
    }else{
      this.suggestedSkillarray = []
    }
  })
  }else{
    this.suggestedSkillarray = [];
  }


  }


  binddata(jobId:any){
    this.authService.getJobPreviewbyID(jobId)
    .subscribe((result) => {
      if (result.status == "success") {
        var data = JSON.parse(JSON.stringify(result.candidate_preference));
        
     
          data.apiKey = environment.apiKey;
          data['job_id'] = jobId;
          
          this.AddCanPrepForm.patchValue({
            // api_key: environment.apiKey,
            job_id: this.authService.jobData()?.job_id??localStorage.getItem('Job_Id'),
         //   job_id : [''],
            // user_id: this.authService.signUpData()?.id,
            user_id: localStorage.getItem('UserId'),
            gender: data?.gender??'',//1=male, 2= female, 3= other
            min_age: data?.min_age??'',
            max_age: data?.max_age??'',
            is_preference: data?.is_preference ==1?true:false,//0 = bydefault, 1= if checked
            qualification: data?.qualification??'',
            experience_type: data?.experience_type??'',//1= fresher, 2= experienced,3= any
            min_experience: data?.min_experience??'',
            any_experience: data?.any_experience??'',
            skills: data?.skills??'',
            app_location_type: data?.app_location_type??'',//1=anywhere,2=specific location
            al_country: data?.al_country??'',
            al_state: data?.al_state??'',
            al_city: data?.al_city??'',
            notice_period: data?.notice_period??'',
            language: data?.language??''
          });
          this.authService.JobPreviewData.set(result.data)
       //  localStorage.setItem('JobId', result.data["job_id"]) ;
      //  if(data.qualification){
      //   this.CanPrepArray[3].array = data.qualification.split(',')
      //  }
       if(data.skills.split(',').length>0){
        this.CanPrepArray[5].array = data.skills.split(',')
       }
       if(data.language){
       var arr = this.CanPrepArray[8].array 
        var lvl = data.eng_lvl.split(',');
        data.language.split(',').forEach((ln:any,li:any) => {
          var lan = this.langList.find(x=>x.id == ln)
          
         
            var obj = Object.assign({});
            obj.name = lan.language_name;
            obj.defalutselected = lvl[li]
            obj.englvl =lvl[li]
            obj.id = lan.id
            arr.push(obj)
           
        });

       
       }
      
    
      }
    });
  }

  addskills(ev:any){
    ev.preventDefault();
    this.CanPrepArray[5].array.push(ev.target.value);
    ev.target.value = '';
  }

  deletebtn(cap:any,name:any){
     let indexToDelete = cap.array.findIndex((x:string)=>x == name);
    if (indexToDelete !== -1) {
      cap.array.splice(indexToDelete, 1);
    }
  }
  deletebtn1(cap:any,name:any){
    let indexToDelete = cap.array.findIndex((x:string)=>x == name);
   if (indexToDelete !== -1) {
     cap.array.splice(indexToDelete, 1);
   }

   var i = this.skillList.findIndex((x:any)=>x.skill_name  == name);
   if(i!=-1){
    this.skillList[i].sign="P"
    var myElement:any = document.getElementById('ski'+i);
    myElement.style.backgroundColor = "white";
      myElement.style.color = "black";
   }

 }

  changeselect(job:any,ev:any){
    var data = this.eduList.find((x:any)=>x.id== ev.target.value);
     if(!data){
      job.array = [];
       job.array.push(data.education);
     }
   }
   changelanguage(job:any,ev:any){
    var lan = this.langList.find(x=>x.id == ev.target.value)
    var data = job.array.find((x:any)=>x.name == lan.language_name);
     if(!data){
      var obj = Object.assign({});
      obj.name = lan.language_name;
      obj.defalutselected = '1'
      obj.englvl ='1'
      obj.id = lan.id
       job.array.push(obj)
     }
   }
   checklan(ev:any,obj:any,englvl:any){
    obj.defalutselected = ev.target.value
    obj.finalname = `${obj.name}-${ev.target.value}`
    obj.englvl =englvl.value
   }

  locationArray = [
    { name: 'app_location_type', label: 'Specific Location', value: '2' },
    { name: 'app_location_type', label: 'Anywhere From India', value: '1' }
  ]

  specLocation = [
    { name: 'al_country', label: 'Country' },
    { name: 'al_state', label: 'State' },
    { name: 'al_city', label: 'City' }
  ]
  radwidth:any;

  onSubmit() {

    var obj = {...JSON.parse(JSON.stringify(this.AddCanPrepForm.value))}
    obj.skills = this.CanPrepArray[5].array?.join(',');
    obj.language = this.CanPrepArray[8].array.map((x:any)=>x.id).join(',')
    obj.eng_lvl= this.CanPrepArray[8].array.map((x:any)=>x.englvl).join(',')
    if(obj.is_preference){
      obj.is_preference = 1
    }else{
      obj.is_preference = 0
    }
  
    if (this.AddCanPrepForm.valid  && obj.skills.length!=0 && obj.qualification.length!=0 && obj.language.length!=0 && !this.agewarning) {
      this.error=false;

      this.authService.addEmpPre(obj);
    }else{
      this.error=true;
    }
  }
  toggleHighlight(id:string) {
    var div:any = document.getElementById(id);
    div.classList.toggle("highlight");
}

onlynumbers(ev:any){
  var str ='1234567890'
  if(str.includes(ev.key)){
    return true;
  }else{
    return false
  }
}
agewarning:Boolean = false
agechange(ev:any){
  ev.preventDefault();
  var max:any = Number(this.AddCanPrepForm.controls.max_age.value)??0;
  var min:any = Number(this.AddCanPrepForm.controls.min_age.value)??0
  if(max>0 && (min>0|| min == 0)){
    if(max < min){
      this.agewarning = true;
    }else{

      this.agewarning = false;
    }
  }else{
    this.agewarning = false;
  }
  
}



 selectskill(job:any,val:any,id:string,i:Number){
  var myElement:any = document.getElementById(id+i);
 
  if(val?.sign == "P"){
    val.sign = "I";
    job.array.push( val?.skill_name)
    myElement.style.backgroundColor = "aliceblue";
    myElement.style.color = "rgb(1, 158, 255)";
  }
  else{
    let indexToDelete = job.array.findIndex((x:string)=>x == val?.skill_name);
    if (indexToDelete !== -1) {
      job.array.splice(indexToDelete, 1);
      val.sign = "P";
      myElement.style.backgroundColor = "white";
      myElement.style.color = "black";
    }
  }

}




}
