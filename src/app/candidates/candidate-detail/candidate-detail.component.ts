import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $:any
@Component({
  selector: 'app-candidate-detail',

  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent{
  active!: number;
  userData:any
  langList :any[] = [];
  subscription:Subscription = new Subscription()
  route  = inject(ActivatedRoute);
  router = inject(Router)
  userId:any
  jobId:any
  constructor() {
    //constructor
  }

  authService = inject(AuthService);
  

  ngOnInit() {
    //this.authService.getEmployeeByID(localStorage.getItem('UserId'));
    // this.authService.signup(localStorage.getItem('UserId'));
    this.route.queryParams.subscribe(x=>{
      if(x['userId']){
        this.userId =x['userId']
        this.jobId= x['jobId']
        this.authService.getJobTitle();
        this.subscription.add(this.authService.getLanguageList().subscribe(lan=>{
          if(lan.code == 200){
            this.langList = lan.data;
            this.getuserdata(x['userId']);
          }
         }))
      
      }
    })
  
    
  }
  getuserdata(id:any){
    this.authService.getEmployee(id).subscribe(x=>{
      if(x.code == 200){
        this.userData = x;
        this.userData.skillData.lan = '';
        this.userData.skillData.other_lang.split(',').forEach((ln:any) => {
          var lan = this.langList.find(x=>x.id == ln)
          if(lan){
            this.userData.skillData.lan += lan.language_name + ',';
          }
        })
        if( this.userData.skillData.lan!=''){
          this.userData.skillData.lan =  this.userData.skillData.lan.slice(0,-1)
        }
        if(this.userData?.resultResume){
          $('#nopre').css('display','none');
          $('#pdfviewer').attr('data',this.userData?.resultResume+"#toolbar=0&navpanes=0&scrollbar=0")
        }else{
          $('#nopre').css('display','block')
          //$('#pdfviewer').attr('data','https://sktexus.com/seekk_api/assets/api/doc/6541doc.pdf#toolbar=0&navpanes=0&scrollbar=0')
        }
      }
    })
  }
  binddata(userdata:any){
  
   if(userdata?.skillData?.skill){
    return userdata.skillData?.skill.replaceAll(',',' |')
   }else{
    return ''
   }
    
  }

  updateEmployeeJobStatus(){
   
    $('#pdfError').css('display','none')
    if($('#dropdownslct').val() =="0"){
      $('#pdfError').css('display','block')
      return;}
    const obj= {
        "api_key" : "seekk!@#$%2023",
        "user_id" : this.userId,
        "status"  : $('#dropdownslct').val() //1= shortlist, 2= interview scheduled, 3= selected, 4= joined
    }
    
    this.subscription.add(
      this.authService.updateEmployeeJobStatus(obj).subscribe(x=>{
        if(x.code==200){
           this.router.navigate(['/candidates/candidate-list'],{queryParams:{
          jobId:this.jobId
          }})
        }
      })
    )
  }

  download(){
    if(this.userData?.resultResume){
      saveAs(this.userData?.resultResume,'Resume')
    }
    
  }
  

}

