import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RecruitersHedingComponent } from '../recruiters-heding/recruiters-heding.component';

@Component({
  selector: 'app-top-recruiters',
  templateUrl: './top-recruiters.component.html',
  styleUrls: ['./top-recruiters.component.css']
})
export class TopRecruitersComponent {
 right:any="-1070px"
 
 nextSlide(){
  console.log('ok');
  if(this.right=="-1070px"){
     return  this.right="0px"
    
  }
  if(this.right=="0px"){
       this.right="-1070px"
       return console.log("-1070px");
      
  }
 }
}
