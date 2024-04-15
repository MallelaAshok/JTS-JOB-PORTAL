import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexPlotOptions,
  ApexResponsive,
} from 'ng-apexcharts';
import { AuthService } from 'src/app/core/service/auth.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public lineChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public stackBarChart!: Partial<ChartOptions>;
  authService = inject(AuthService);
  selctpost=new FormControl('0')
  router = inject(Router)
  

  ngOnInit() {
    this.authService.getEmployeeByID(localStorage.getItem('UserId'));
    if(this.authService.toDashboard()){
      this.selctpost.setValue('2')
    }
    // if(this.authService.EmpJobsListData()){
    //   this.authService.EmpJobsListData().completed.forEach((x:any) => {
    //     if(x.skills){
    //       x.skills = x.skills.replaceAll(',','|')
    //     }
    //   });
    //   this.authService.EmpJobsListData().completed.forEach((x:any) => {
    //     if(x.skills){
    //       x.skills = x.skills.replaceAll(',','|')
    //     }
    //   });
    // }
    // this.authService.signup(localStorage.getItem('UserId'));
    
    
  }

  diabledhiretalent():Boolean{
    if(localStorage.getItem('is_verify')){
      if(Number(localStorage.getItem('is_verify')) == 2){
        return true;
      }
      return false;
    }
    return false;
  
  }

  skills(skills:any){
    if(skills){
      return skills.replaceAll(',',' | ')
    }
    return '';
  }

  navigate(job:any){
    const id = { jobId: job.id};
    this.router.navigate(['candidates/candidate-list'], { queryParams: id });
  }
  pendingNavigate(job:any){
       if(job?.is_completed=="1"){
        this.router.navigate([`/jobs/new-job`],{queryParams:{
          jobId:job.id
        }})
       }else if(job?.is_completed=="2"){
        this.router.navigate([`/jobs/add-Candidate-prep`],{queryParams:{
          jobId:job.id
        }})
       }else if(job?.is_completed=="3"){
        this.router.navigate([`/jobs/add-Interview-prep`],{queryParams:{
          jobId:job.id
        }})
       }
  }

}
