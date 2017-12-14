import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router'
import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';
import { UsersService } from '../../services/users.service';
import { TasksService } from '../../services/tasks.service';
import { DateService } from '../../services/date.service';
import { Task } from '../../interfaces/task';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private subTask: any;
  private subUser: any;
	private subStatuses: any;
  private subQueryParams: any;  
	private pk: number;
	private task: Task;
	private user: User;
	private allUsersData: User[] = [];	
	private selectedUser: number;
	private allStatuses: string[] = [];
  private dateUnixNow: number = this.dateService.getNowDate()['unixTimeStamp'];
  private dateUnixNowStr: string = this.dateService.fromUnixToHuman(this.dateUnixNow);    

  constructor(private activatedRoute: ActivatedRoute, 
  						private tasksService: TasksService,
  						private usersService: UsersService,
  						private dateService: DateService,
              private router: Router,
              private matDialog: MatDialog) { }

  ngOnInit() {
  	let this_ = this;

    this.subQueryParams = this.activatedRoute.params.subscribe(params => {
      this.pk = +params['pk'];
    });  	

    this.getTask();  
    this.getAllStatuses();  
    this.getAllUsersData();	    
  }

  ngOnDestroy() {
    this.subQueryParams.unsubscribe();
    this.subStatuses.unsubscribe();
    this.subUser.unsubscribe();
    this.subTask.unsubscribe();
  }   

  private getTask(): void {   
    this.subTask = this.tasksService.getTask(this.pk).subscribe(
      data => {   
        this.task = JSON.parse(data);    

        this.task[0].fields['created_date_unix'] = this.dateService.stringToUnix(this.task[0].fields.created_date);
        this.task[0].fields.created_date = this.dateService.fromUnixToHuman(this.task[0].fields['created_date_unix']);

        this.task[0].fields['deadline_date_unix'] = this.dateService.stringToUnix(this.task[0].fields.deadline_date);
        this.task[0].fields.deadline_date = this.dateService.fromUnixToHuman(this.task[0].fields['deadline_date_unix']);        
   
        console.log('task', this.task);

        this.selectedUser = this.task[0].fields.user;

        this.getUser(this.selectedUser);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };

  private getUser(id): void {   
    this.subUser = this.usersService.getUser(id).subscribe(
      data => {   
        this.user = JSON.parse(data);               
        console.log('user', this.user);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };  

  private getAllUsersData(): void { 	
  	this.usersService.getUsers().subscribe(
      data => {   
        this.allUsersData = JSON.parse(data);                 
        // console.log('allUsersData', this.allUsersData);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };   

  private onChangeUser(ev, taskId) {
  	this.selectedUser = ev.value;
  	this.tasksService.updateTask(this.selectedUser, taskId).subscribe(
	  	(data) => {
	  		if(JSON.parse(data)['request_status'] == 1) {
          this.matDialog.open(InfoDialogComponent, {
            width: '300px',
            hasBackdrop: true,
            data: { title: 'Выполнено', message: 'Назначен новый пользователь' }
          });            
	  		};
        this.router.navigate(['/list']);
	  	}
	  );
  }; 


  private onChangeStatus(ev, taskId): void {   
  	console.log(ev, taskId);
  	this.tasksService.updateStatus(ev.value, taskId).subscribe(
	  	(data) => {
	  		if(JSON.parse(data)['request_status'] == 1) {
          this.matDialog.open(InfoDialogComponent, {
            width: '300px',
            hasBackdrop: true,
            data: { title: 'Выполнено', message: 'Статус Задания изменён' }
          });            
	  		};
	  	}
	  );  	
  };

  private getAllStatuses(): void {   
    this.subStatuses = this.tasksService.getAllStatuses().subscribe(
      data => {   
        let allStatuses = JSON.parse(data);   
        this.allStatuses = [];

        allStatuses.forEach((el) => {
          this.allStatuses.push(el.fields.title);
        });

        // console.log('allStatuses', this.allStatuses);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };    

  private toList(): void {
    this.router.navigate(['/list']);
  };

}
