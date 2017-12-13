import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { MatDialog } from '@angular/material';

import { UsersService } from '../../services/users.service';
import { GlobalVarsService } from '../../services/global-vars.service';
import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private login: string = '';
  private password: string = '';
	private allUsersData: User[] = [];	

  constructor(private usersService: UsersService, 
              private globalVarsService: GlobalVarsService, 
              private router: Router,
              private matDialog: MatDialog) { }

  ngOnInit() {
    // this.globalVarsService.setVar('authorizedLogin', 1);
    // this.globalVarsService.setVar('authorizedPk', 1);    
      
  	this.getAllUsersData();    
  }

  private checkAuth(): void {
    if(this.login) { this.login = this.login.trim(); }
    if(this.password) { this.password = this.password.trim(); }

    if(!this.login || !this.password) {
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Ошибка!', message: 'Введите авторизационные данные' }
      });      
      return;
    }

    let isAuthOk = false;
    let userPk;

    this.allUsersData.forEach((user) => {
      if(user.fields.login == this.login && user.fields.password == this.password) {
        isAuthOk = true;     
        userPk = user.pk;  
      }
    });

    if(isAuthOk) {
      this.globalVarsService.setVar('authorizedLogin', this.login);
      this.globalVarsService.setVar('authorizedPk', userPk);
      this.router.navigate(['/list']); 
    } else {
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Ошибка!', message: 'Неверные авторизационные данные' }
      });       
    }
  };

  private getAllUsersData(): void { 	
  	this.usersService.getUsers().subscribe(
      data => {   
        this.allUsersData = JSON.parse(data);                 
        console.log('allUsersData', this.allUsersData);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };  
}
