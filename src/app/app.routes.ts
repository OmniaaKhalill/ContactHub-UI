import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login-component/login-component';
import { HomeComponent } from './components/home/home-component/home-component';
import { JobsComponent } from './components/Job/jobs-component/jobs-component';
import { ProfilesComponent } from './components/Profile/profiles-component/profiles-component';
import { MyProfileComponent } from './components/Profile/my-profile-component/my-profile-component';
import { DepartmentsComponent } from './components/Department/departments-component/departments-component';
import { RegisterComponent } from './components/Auth/register-component/register-component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: HomeComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [authGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [authGuard] },
  { path: 'profiles', component: ProfilesComponent, canActivate: [authGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [authGuard] },

];
