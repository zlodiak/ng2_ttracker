import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { };

  getUsers(): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_users/index');
  };

  getUser(id): Observable<any> {
  	return this.http.get('http://127.0.0.1:8000/app_users/get_user?id=' + id);
  };  

}
