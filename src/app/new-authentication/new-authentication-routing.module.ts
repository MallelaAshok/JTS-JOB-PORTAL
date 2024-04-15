import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincontententComponent } from './logincontentent/logincontentent.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LogComponent } from './log/log.component';
//import { HomeComponent } from '../new-project/src/app/home/home.component';

const routes: Routes = [
  {
    path:'',
    component:LogComponent,children:[
     {path:'login',component:LoginpageComponent}
    ]
},
// {
//     path:'home',
//     component:HomeComponent
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAuthenticationRoutingModule { }
