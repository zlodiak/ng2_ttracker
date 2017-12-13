import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';

import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    children: [],
    canActivate: [AuthGuardService],
    component: ListComponent
  }, 
  {
    path: 'details/:pk',
    children: [],
    canActivate: [AuthGuardService],
    component: DetailsComponent
  },
  {
    path: 'login',
    children: [],
    component: LoginComponent
  },  
  {
    path: '**', 
    component: PageNotFoundComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
