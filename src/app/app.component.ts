import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { GlobalVarsService } from './services/global-vars.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private authorizeLogin: string;	

	constructor(private globalVarsService: GlobalVarsService, 
							private router: Router) {}

	ngOnInit() {
		this.globalVarsService.getAuthLogin().subscribe(
			(data) => {
				this.authorizeLogin = data;
				//console.log('authorizeLogin', this.authorizeLogin);
			}, 
			(err) => {
				console.log('err', err);
			}
		);
	}
  
	private logout(): void {
		this.globalVarsService.setVar('authorizedLogin', undefined);
		this.globalVarsService.setVar('authorizedPk', undefined);
		this.router.navigate(['/login']);
	};

}
