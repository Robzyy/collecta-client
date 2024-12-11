import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MainComponent } from './components/main/main.component';
import { DebugComponent } from './components/debug/debug.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'debugPrimitives', component: DebugComponent },
  { path: '', component: MainComponent },
  { path: '**', component: NotFoundComponent },
];
