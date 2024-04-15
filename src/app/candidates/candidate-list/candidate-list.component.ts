import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit,OnDestroy{
  authService = inject(AuthService);
  route = inject(ActivatedRoute)
  datepipe = inject(DatePipe)
  router = inject(Router)
  dropdownList = [
    { item_id: 1, item_text: 'IT' },
    { item_id: 2, item_text: 'SoftWere Product' },
    { item_id: 3, item_text: 'Ecommerce' },
  ];
  LandropdownList = [
    { item_id: 1, item_text: 'Telugu(50)' },
    { item_id: 2, item_text: 'Tamil(25)' },
    { item_id: 3, item_text: 'Hindi(75)' }, 
  ]
  selectedItems = [
    { item_id: 3, item_text: 'Pune' },
    { item_id: 4, item_text: 'Navsari' }
  ];
  dropdownSettings:any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  langList:any[]=[];
  department:any[]=[
    { id: 1, name: 'IT' },
    { id: 2, name: 'SoftWere Product' },
    { id: 3, name: 'Ecommerce' },
  ]
  experience:any[]=[
    { id: 1, name: '1 Year' },
        { id: 2, name: '2 Years' },
  ]
  jobId:any
  subscription: Subscription = new Subscription()
constructor(){
  
}
  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }
  ngOnInit() {
    this.route.queryParams.subscribe(x=>{
      if(x['jobId']){
        this.jobId = x['jobId']
        this.subscription.add(this.authService.getJobByJid(x['jobId']));
        this.subscription.add(this.authService.getEmployeeByID(localStorage.getItem('UserId')));
      }
     })
   
    // this.authService.signup(localStorage.getItem('UserId'));
   // this.authService.getJobTitle();

  }


    age = [
        { id: 1, name: '18 Years' },
        { id: 2, name: '19 Years' },
       
    ];

    jobtitle(arr:any){
      if(arr && arr.length>0){
         const find = arr.find((x:any)=>x.id == this.jobId)
         if(find){
          return find.job_title;
         }
      }
    }
    binddata(job:any){


      // age
      if(job?.dob){
        const dobParts = job?.dob.split("/");
        const dobDay = parseInt(dobParts[0]);
        const dobMonth = parseInt(dobParts[1]) - 1; // Months are zero-indexed
        const dobYear = parseInt(dobParts[2]);
        const dob = new Date(dobYear, dobMonth, dobDay);
        const now = new Date();
      
        let age = now.getFullYear() - dob.getFullYear();
        const monthDiff = now.getMonth() - dob.getMonth();
      
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
          age--;
        }
         job.age = age + 'Years';
      }

      //location Type

      if(job?.location_type == "1"){
        job.locationname = "Work From Office"
      }else if(job?.location_type == "2"){
        job.locationname = "Remote"
      }else {
        job.locationname = "Hybrid"
      }
     // skills
      if(job?.skill){
        job.skills = job?.skill.replaceAll(',',' |')
      }


    //Gender
      if(job?.gender == '1'){
        return "Male";
      }else if(job?.gender == '2'){
        return "Female";
      }else{
        return "Male & Female"
      }
    }

    navigate(route:any,job:any){
     
        this.router.navigate([route],{queryParams:{
          userId:job.user_id,jobId:this.jobId
        }})
    }
}
