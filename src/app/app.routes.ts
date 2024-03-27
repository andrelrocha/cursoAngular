import { Routes } from '@angular/router';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginUserComponent } from './components/user/login-user/login-user.component';

export const routes: Routes = [
  { path: "login", component: LoginUserComponent },
  { path: "create", component: CreateUserComponent }
];
