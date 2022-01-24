import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';
import { HomeComponent } from './home/home.component';
import { KhataComponent } from './khata/khata.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService } from './service/auth.service'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent,canActivate: [AuthService] },
    { path: 'khata', component: KhataComponent,canActivate: [AuthService] },
    { path: 'finance', component: FinanceComponent,canActivate: [AuthService] },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
