import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';


@Injectable()
export class TasksService {

  constructor(private http: HttpClient) { };

  getUserTasks(userId): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_tasks/user_tasks?user_id=' + userId);
  };

}
