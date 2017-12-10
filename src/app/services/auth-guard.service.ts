import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { GlobalVarsService } from './global-vars.service';


@Injectable()
export class AuthGuardService {

  constructor(private router: Router,
  						private globalVarsService: GlobalVarsService) { };

  canActivate() {
  	return true;
    /*let authorizedLogin = this.globalVarsService.getVar('authorizedLogin');

    if(!authorizedLogin) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }*/
  } 

}
