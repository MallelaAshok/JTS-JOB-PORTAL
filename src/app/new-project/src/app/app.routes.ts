import { Routes } from '@angular/router';
import { LogincontententComponent } from './logincontentent/logincontentent.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:LogincontententComponent
    },
    {
        path:'home',
        component:HomeComponent
    },

];
