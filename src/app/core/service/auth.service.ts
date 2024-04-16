import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { Otp, OtpResponse, addJob, signin } from '../models/authToken';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  OtpValue = signal<OtpResponse | null>(null);
  errorValue = signal<string | null>(null);
  jobData = signal<addJob | null>(null);
  IndustryData = signal<any | null>(null);
  sigiInData = signal<any | null>(null);
  signUpData = signal<any | null>(null);
  EmpJobsListData = signal<any | null>(null);
  UserProfileListData = signal<any | null>(null);
  JobPreviewData = signal<any | null>(null);
  jobListData = signal<any | null>(null);
  CityData = signal<any | null>(null);
  RolData = signal<any | null>(null);
  LangData = signal<any | null>(null);
  ExpData = signal<any | null>(null);
  toDashboard = signal<any | null>(null)

  http = inject(HttpClient);
  router = inject(Router)

  clickIn = 1;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  currentUserValue: User = new User;
  getIndustry: any;


  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }




  getOtp(otp: Otp):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/SignIn/login`, otp)
      // .pipe(
      //   catchError(this.handleError)
      // )
      // .subscribe((result) => {
      //   console.log(result);
      //   localStorage.setItem('authToken', result.token);
      //   this.OtpValue.set(result);
      // });
  }

  signin(signin: any) {
    this.http.post<any>(`${environment.apiUrl}/SignIn/verify`, signin)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        console.log(result);
        if (result.status == "success") {
          localStorage.setItem('Status', result.status);
          this.sigiInData.set(result.data)
          localStorage.setItem('UserId', result.data["id"]);
          localStorage.setItem('CompanyName', result.data["company_name"]);
          localStorage.setItem('MobileNo', result.mobile);
          localStorage.setItem('is_verify', result.data['is_verify']);
          // localStorage.setItem('JobId', result.data["job_id"]);
           this.OtpValue.set(null);
          if (result.data["is_registered"] == 1) {
            this.router.navigate(['/dashboard']);
            // this.router.navigate(['/authentication/signup']);
          } else {
            this.router.navigate(['/authentication/signup']);
          }
        }
        // else {
        //   localStorage.setItem('Status', 'failure');
        //   this.errorValue.set("Error in Login")
        // }
      });

  }

  signup(signup: any) {
    this.http.post<any>(`${environment.apiUrl}/SignUp/signup`, signup)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        console.log(result);
        if (result.status == "success") {
          this.signUpData.set(result);
          console.log(result.data);
          if (result.is_verify == 2) {
            this.router.navigate(['/jobs/invalid']);
          } else {
            this.router.navigate(['/dashboard']);
          }

        } else {
          this.errorValue.set("Error in Save Data")
        }

      });
  }



  addJob(jobs: any) {
    
    this.http.post<any>(`${environment.apiUrl}/JobDetails/update`, jobs)
      .pipe(
        catchError(this.handleError)
      ) 
      .subscribe((result) => {
        console.log(result);
        if (result.status == "success") {
          this.router.navigate(['/jobs/add-Candidate-prep'],{queryParams:{'jobId':result.job_id}});
          this.jobData.set(result);
          localStorage.setItem('Job_Id',result.job_id)
        } else {
          console.log(result)
          this.errorValue.set("Error in Save Data");
        }

      });
  }

  getSuggestedSkill(obj:any):Observable<any>{
   return  this.http.get<any>(`${environment.apiUrl}/CandidateReq/getSuggestedSkill`,obj)
  }

  addEmpPre(EmpPre: any) {
   
    this.http.post<any>(`${environment.apiUrl}/CandidateReq/update`, EmpPre)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        console.log(result);
        if (result.status == "success") {
          this.router.navigate(['/jobs/add-Interview-prep'],{queryParams:{'jobId':result.candidate_req.job_id}});
        } else {
          console.log(result)
          this.errorValue.set("Error in Save Data")
        }

      });
  }
  getEducationList():Observable<any>{
    var body ={
      "api_key" : "seekk!@#$%2023"
  }
  return  this.http.post<any>(`${environment.apiUrl}/CandidateReq/getEducationList`, body)
  }

  getSkillList():Observable<any>{
    var body ={
      "api_key" : "seekk!@#$%2023"
  }
  return  this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getSkillList`, body)
  }
  getNoticePeriodList():Observable<any>{
    var body ={
      "api_key" : "seekk!@#$%2023"
  }
  return  this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getNoticePeriodList`, body)
  }

  getEngLvlList():Observable<any>{
    var body ={
      "api_key" : "seekk!@#$%2023"
  }
  return  this.http.post<any>(`${environment.apiUrl}/CandidateReq/getEngLvlList`, body)
  }

  getLanguageList():Observable<any>{
    var body ={
      "api_key" : "seekk!@#$%2023"
  }
  return  this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getLanguageList`, body)
  }

  addIntPre(IntPre: any) {
    this.http.post<any>(`${environment.apiUrl}/InterviewerInfo/update`, IntPre)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        console.log(result);
        if (result.status == "success") {
          const id = { jobId: result.interviewer_info.job_id};
         this.router.navigate(['jobs/preview-job'], { queryParams: id });
          // this.router.navigate(['/dashboard']);
        } else {
          console.log(result)
          this.errorValue.set("Error in Save Data")
        }

      });
  }
  finalupdate(jobdetails:any,IntPre:any ,EmpPre:any):Observable<any>{
   var ur1 = this.http.post<any>(`${environment.apiUrl}/JobDetails/update`, jobdetails)
   var url2= this.http.post<any>(`${environment.apiUrl}/InterviewerInfo/update`, IntPre)
   var url3 = this.http.post<any>(`${environment.apiUrl}/CandidateReq/update`, EmpPre)
   return forkJoin([ur1,url2,url3])
  }

  //  getIndustry(api:any){
  //   const body:any = JSON.stringify(api);
  //   this.http.get<any>(`${environment.apiUrl}/JobDetails/getIndustryList`,body)
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  //   .subscribe((result) => {
  //     console.log(result);

  //     });
  //  }



  logout() {
    localStorage.setItem('Status', 'failure');
    return of({ success: false });
  }


  getCompanyName() {
    return localStorage.getItem('CompanyName');
  }

  getJobTitle() {
  
    return localStorage.getItem('JobTitle');}

  getProfileID(userid: any) {
    console.log(userid);
    const requestBody = {
      api_key: "seekk!@#$%2023",
      //  user_id: 2
      user_id: userid,
    };

    this.http.post<any>(`${environment.apiUrl}/JobDetails/editProfile`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        if (result.status == "success") {
          console.log(result);
          this.UserProfileListData.set(result);
     

        } else {
          console.log(result)
          this.errorValue.set("Error in Save Data")
        }
      });
  }

  editProfile(obj:any):Observable<any>{

  return  this.http.post<any>(`${environment.apiUrl}/JobDetails/editProfile`, obj)
  }

  getEmployeeByID(userid: any) {
    console.log(userid);
    const requestBody = {
      api_key: "seekk!@#$%2023",
    //  user_id: 2
      user_id: userid,
    };

    this.http.post<any>(`${environment.apiUrl}/JobDetails/getJobListByUserId`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        if (result.status == "success") {
          console.log(result);
          this.EmpJobsListData.set(result);
     

        } else {
          console.log(result)
          this.errorValue.set("Error in Save Data")
        }
      });
  }

  getEmployee(userid: any):Observable<any> {
    console.log(userid);
    const requestBody = {
      api_key: "seekk!@#$%2023",
    //  user_id: 2
     user_id: userid,
    };

   return this.http.post<any>(`${environment.apiUrl}/JobDetails/getUserByUserId`, requestBody)
      // .pipe(
      //   catchError(this.handleError)
      // )
      // .subscribe((result) => {
      //   if (result.status == "success") {
      //     console.log(result);
      //     this.EmpJobsListData.set(result);
     

      //   } else {
      //     console.log(result)
      //     this.errorValue.set("Error in Save Data")
      //   }
      // });
  }

  updateEmployeeJobStatus(obj:any):Observable<any>{
  
    return this.http.post<any>(`${environment.apiUrl}/JobDetails/updateEmployeeJobStatus`, obj)
  }

  getProfileByMob(obj:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/JobDetails/getProfileByMob`, obj)
  }


  getJobPreviewbyID(job_id: any) :Observable<any>{
    //console.log(id);
    const requestBody = {
      api_key: "seekk!@#$%2023",
      //  user_id: 2

    job_id: job_id,
    };

  return  this.http.post<any>(`${environment.apiUrl}/JobDetails/getJobPreviewById`, requestBody)
    
  }

  getJobByJid(id:any){
    const requestBody = {
      api_key  : "seekk!@#$%2023",
      job_id  : id
    }
    this.http.post<any>(`${environment.apiUrl}/JobDetails/getUsersByJobId`, requestBody )
    .pipe(
      catchError(this.handleError)
    )
    .subscribe((result) => {
      if(result.status == "success"){
        console.log(result);
        this.jobListData.set(result);
      }else{
        console.log(result)
        this.errorValue.set("Error in Save Data")
      }
      });
  }


  getRol():Observable<any> {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
  return this.http.post<any>(`${environment.apiUrl}/JobDetails/getRoleList`, requestBody)
  }
  getDepartmentList():Observable<any> {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
  return this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getDepartmentList`, requestBody)
  }

  getCityList():Observable<any> {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
  return this.http.post<any>(`${environment.apiUrl}/JobDetails/getCityList`, requestBody)
  }


  updatejobpreference(body:any):Observable<any> {
    console.log(body)
    
    const requestBody = {
      api_key: "seekk!@#$%2023",
      jobTitle:body.controls.job_title.value,
      role: body.controls.role.value,
      department: body.controls.department.value,
      industry:body.controls.industry.value,
      jobType:body.controls.job_type.value,
      minSalary:body.controls.min_salary.value,
      maxSalary:body.controls.max_salary.value,
      workType:body.controls.location_type.value,
      workLocationType : body.controls.work_location_type.value,
      workAddress:body.controls.location_type.value,
      benifits:body.controls.job_title.value,
      jobDescription:body.controls.job_title.value,
      Country: body.controls.wl_country.value,
      State: body.controls.wl_state.value,
      Pincode: body.controls.wl_pincode.value,
    };
  return this.http.post<any>(`${environment.apiUrl}/JobDetails/update`, requestBody)
  }
  

  getIndustryList():Observable<any> {
    const requestBody = {
      api_key: "seekk!@#$%2023" 
    };
  return this.http.post<any>(`${environment.apiUrl}/JobDetails/getIndustryList`, requestBody)
  }
  getdepatl() {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
    this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getDepartmentList`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        if (this.clickIn == 1) {
          if (result.status == "success") {
            //  this.clickIn = 0;
            console.log(result);
            this.RolData.set(result.data);
            return result.data
          } else {
            //  this.clickIn = 1;
            console.log(result)
            this.errorValue.set("Error in Save Data")
            return []
          }
        }else{
          return []
        }
      });
      return [];
  }

  getPerkList():Observable<any>{    
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
  return this.http.post<any>(`${environment.apiUrl}/SeekkMobile/getPerkList`, requestBody)
  }


  // getindustrylist() {
  //   const requestBody = {
  //     api_key: "seekk!@#$%2023"
  //   };
  //   this.http.post<any>(`${environment.apiUrl}/JobDetails/getIndustryList`, requestBody)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  //     .subscribe((result) => {
  //       if (this.clickIn == 1) {
  //         if (result.status == "success") {
  //           //  this.clickIn = 0;
  //           console.log(result);
  //           this.RolData.set(result.data);
  //           return result.data
  //         } else {
  //           //  this.clickIn = 1;
  //           console.log(result)
  //           this.errorValue.set("Error in Save Data")
  //           return []
  //         }
  //       }else{
  //         return []
  //       }
  //     });
  //     return [];
  // }

  getLanLevel() {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
    this.http.post<any>(`${environment.apiUrl}/CandidateReq/getEngLvlList`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        if (this.clickIn == 1) {
          if (result.status == "success") {
            this.clickIn = 0;
            console.log(result);
            this.LangData.set(result.data);
          } else {
            this.clickIn = 1;
            console.log(result)
            this.errorValue.set("Error in Save Data")
          }
        }
      });
  }


  getExp() {
    const requestBody = {
      api_key: "seekk!@#$%2023"
    };
    this.http.post<any>(`${environment.apiUrl}/CandidateReq/getExperienceList`, requestBody)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result) => {
        if (this.clickIn == 1) {
          if (result.status == "success") {
            this.clickIn = 0;
            console.log(result);
            this.ExpData.set(result.data);
          } else {
            this.clickIn = 1;
            console.log(result)
            this.errorValue.set("Error in Save Data")
          }
        }
      });
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

}
