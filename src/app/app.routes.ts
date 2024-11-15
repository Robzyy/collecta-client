import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', component: MainComponent },
];

