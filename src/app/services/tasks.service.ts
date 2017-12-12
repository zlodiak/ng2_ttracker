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

}
