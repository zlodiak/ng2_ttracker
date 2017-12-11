import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatInputModule,
         MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { GlobalVarsService } from './services/global-vars.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';
import { DateService } from './services/date.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ListComponent,
    DetailsComponent,
    InfoDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DateService,
    GlobalVarsService,
    AuthGuardService,
    TasksService,
    UsersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoDialogComponent
  ]   
})
export class AppModule { }
