import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/Auth/login-component/login-component';
import { HomeComponent } from './components/home/home-component/home-component';
import { JobsComponent } from './components/Job/jobs-component/jobs-component';
import { ProfilesComponent } from './components/Profile/profiles-component/profiles-component';
import { MyProfileComponent } from './components/Profile/my-profile-component/my-profile-component';
import { DepartmentsComponent } from './components/Department/departments-component/departments-component';

export const routes: Routes = [

{path:"", redirectTo :"home",pathMatch:"full"},
{path:"home",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"logout", component:HomeComponent},
{path:"jobs" , component:JobsComponent},
{path:"departments" , component:DepartmentsComponent},
{path:"profiles" , component:ProfilesComponent},
{path:"my-profile" , component:MyProfileComponent},

];
