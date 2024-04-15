import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAuthenticationRoutingModule } from './new-authentication-routing.module';
import { LogincontententComponent } from './logincontentent/logincontentent.component';
import { ManagedRecruitmentComponent } from './managed-recruitment/managed-recruitment.component';
import { TopRecruitersComponent } from './top-recruiters/top-recruiters.component';
import { RecruitersHedingComponent } from './recruiters-heding/recruiters-heding.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LogComponent } from './log/log.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { NgxOtpInputModule } from 'ngx-otp-input';
import {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
} from 'angular-feather/icons';
const icons = {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
};

@NgModule({
  declarations: [ 
    LogincontententComponent,
    ManagedRecruitmentComponent,
    TopRecruitersComponent,
    RecruitersHedingComponent,
    LoginpageComponent,
    LogComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
    NgxOtpInputModule,
    CommonModule,
    NewAuthenticationRoutingModule
  ]
})
export class NewAuthenticationModule { }
