import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/switchMap';


@Injectable()
export class TasksService {

  constructor(private http: HttpClient) { };

  getUserTasks(userId): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_tasks/user_tasks?user_id=' + userId);
		/*return Observable.interval(5000).switchMap(() => {
			return this.http.get('http://127.0.0.1:8000/app_tasks/user_tasks?user_id=' + userId);
		});  */	
  };

  getTask(pk): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_tasks/get_task?pk=' + pk );	
  };  

  getAllStatuses(): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_tasks/all_statuses');	
  };

  updateTask(userId, taskId): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_tasks/update_task?user_id=' + userId + '&task_id=' + taskId);	
  };  

  updateStatus(statusId, taskId): Observable<any> {
  	console.log(statusId);
  	return this.http.get('http://127.0.0.1:8000/app_tasks/update_status?status_id=' + statusId + '&task_id=' + taskId);	
  };    

}
