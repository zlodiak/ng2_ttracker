import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVarsService } from '../../services/global-vars.service';
import { TasksService } from '../../services/tasks.service';
import { DateService } from '../../services/date.service';
import { Task } from '../../interfaces/task';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private subTasks: any;
  private subStatuses: any;
  private allStatuses: string[] = [];
  private userTasks: Task[] = [];
	private userTasksSorted: Task[] = [];
  private dateUnixNow: number = this.dateService.getNowDate()['unixTimeStamp'];
  private dateUnixNowStr: string = this.dateService.fromUnixToHuman(this.dateUnixNow);  

  constructor(private globalVarsService: GlobalVarsService,
  						private tasksService: TasksService,
              private dateService: DateService, 
              private router: Router) { }

  ngOnInit() {
  	let userId = this.globalVarsService.getVar('authorizedPk');
    this.getUserTasks(userId);
    this.getAllStatuses();
  }

  ngOnDestroy() {
    this.subTasks.unsubscribe();
    this.subStatuses.unsubscribe();
  }  

  private getUserTasks(userId): void {   
    this.subTasks = this.tasksService.getUserTasks(userId).subscribe(
      data => {   
        let userTasks = JSON.parse(data);         

        userTasks.forEach((task) => {
          task.fields['deadline_date_unix'] = this.dateService.stringToUnix(task.fields.deadline_date) - (60 * 60 * 3);
          task.fields.deadline_date = this.dateService.fromUnixToHuman(task.fields['deadline_date_unix']);

          task.fields['created_date_unix'] = this.dateService.stringToUnix(task.fields.created_date)  - (60 * 60 * 3);
          task.fields.created_date = this.dateService.fromUnixToHuman(task.fields['created_date_unix']);
        });    

        this.userTasks = userTasks; 
        this.userTasksSorted = this.userTasks.slice(); 
        console.log('userTasks', this.userTasks);
      }, 
      err => {
        // console.log('err', err)         
      }
    )
  };

  private getAllStatuses(): void {   
    this.subStatuses = this.tasksService.getAllStatuses().subscribe(
      data => {   
        let allStatuses = JSON.parse(data);   

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

  private openDetails(pk):void {
    this.router.navigate(['/details', pk]);
  }; 
    
}
